/* ==========================================================================
   LOGIKA INTERAKTIF RUANG KELAS DIGITAL (MENGGUNAKAN DATA DARI data.js)
   ========================================================================== */
const STORAGE_KEY = 'ruang_kelas_bu_aulia_v1';
const ALL_SECTIONS = ['beranda', 'mapel', 'modul', 'galeri', 'asesmen'];

let appState = {
  visitedSections: ['beranda'],
  badges: { explorer: false, quizChamp: false },
  checklist: { c1: false, c2: false, c3: false, c4: false },
  muted: false,
  theme: 'light',
  accent: 'blue'
};

let tipIndex = 0;
let miniQuizState = { 0: null, 1: null, 2: null };
let audioCtx = null;
let toastTimer = null;
let mascotTimer = null;

/* ==========================================================================
   RENDER KOMPONEN DARI CLASS_DATA (AGAR HTML RINGKAS & RAPI)
   ========================================================================== */
function renderDynamicComponents() {
  // 1. Peta Petualangan 5 Pos
  const mapGrid = document.getElementById('mapNodesGrid');
  if (mapGrid) {
    mapGrid.innerHTML = CLASS_DATA.adventureMap.map(pos => `
      <div class="map-pos-card" data-map-pos="${pos.id}" onclick="navigateToSection('${pos.id}')" role="button" tabindex="0">
        <div class="pos-number-circle">${pos.num}</div>
        <h4 style="font-weight:900;">${pos.title}</h4>
        <p style="font-size:0.85rem; font-weight:700;">${pos.desc}</p>
        <span class="pos-status-tag">🔒 Klik untuk Buka</span>
      </div>
    `).join('');
  }

  // 2. 5 Kartu Visual Pancaindra
  const sensesGrid = document.getElementById('sensesShowcase');
  if (sensesGrid) {
    sensesGrid.innerHTML = CLASS_DATA.senses.map(s => `
      <div class="sense-card" onclick="speakText('${s.tts}', this)">
        <div class="sense-icon-wrap" style="background:${s.bg};">${s.svg}</div>
        <h4 style="font-weight:900;">${s.title}</h4>
        <p style="font-size:0.86rem; font-weight:700;">${s.desc}</p>
        <span class="flip-hint-pill">🔊 Klik untuk Dengar</span>
      </div>
    `).join('');
  }

  // 3. Checklist Belajar di Rumah
  const checklistEl = document.getElementById('homeChecklistContainer');
  if (checklistEl) {
    checklistEl.innerHTML = CLASS_DATA.homeChecklist.map(item => `
      <div class="checklist-row" data-check-id="${item.id}" onclick="toggleChecklist('${item.id}')">
        <div class="custom-checkbox"></div>
        <span>${item.text}</span>
      </div>
    `).join('');
  }

  // 4. Kartu Flip Istilah Penting IPA
  const flipGrid = document.getElementById('flipCardsGrid');
  if (flipGrid) {
    flipGrid.innerHTML = CLASS_DATA.flipCards.map(card => `
      <div class="flat-flip-card" onclick="flipCard(this)" role="button" tabindex="0">
        <div class="flip-front">
          <span style="font-size:2rem;">${card.icon}</span>
          <h4 style="font-size:1.2rem; font-weight:900;">${card.term}</h4>
          <span class="flip-hint-pill">👆 Klik Balik Kartu</span>
        </div>
        <div class="flip-back">
          <h4 style="font-size:1.05rem; font-weight:900;">Arti ${card.term}:</h4>
          <p style="font-size:0.92rem; font-weight:700;">${card.meaning}</p>
          <span class="flip-hint-pill">🔄 Klik Kembali</span>
        </div>
      </div>
    `).join('');
  }

  // 5. Mini Kuis Kilat 3 Soal
  const quizContainer = document.getElementById('miniQuizQuestions');
  if (quizContainer) {
    quizContainer.innerHTML = CLASS_DATA.miniQuiz.map((q, qIdx) => `
      <div class="quiz-question-card" data-q="${qIdx}">
        <h4 style="font-size:1.08rem; font-weight:900;">${q.question}</h4>
        <div class="quiz-options-grid">
          ${q.options.map(opt => `
            <button type="button" class="quiz-opt-btn" onclick="answerMiniQuiz(${qIdx}, ${opt.correct}, this)">
              ${opt.label}
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="qFeedback${qIdx}"></div>
      </div>
    `).join('');
  }

  // 6. Accordion Modul Ajar
  const accList = document.getElementById('modulAccordionList');
  if (accList) {
    accList.innerHTML = CLASS_DATA.modulAccordion.map((sec, idx) => `
      <div class="accordion-item ${idx === 0 ? 'open' : ''}">
        <button type="button" class="accordion-trigger" onclick="toggleAccordion(this)">
          <span>${sec.title}</span>
          <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
          <ul class="bullet-kids">
            ${sec.items.map(li => `<li><span>•</span> <span>${li}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  // 7. Pojok Baca & Sumber Belajar (Deteksi otomatis link kosong -> "Segera hadir")
  const readingGrid = document.getElementById('readingCornerGrid');
  if (readingGrid) {
    readingGrid.innerHTML = CLASS_DATA.readingCorner.map(book => {
      const cleanUrl = (book.url || '').trim();
      const actionHtml = (!cleanUrl || cleanUrl === '#')
        ? `<div class="coming-soon-badge">⏳ Segera hadir</div>`
        : `<a href="${cleanUrl}" target="_blank" rel="noopener" class="big-action-btn btn-orange" style="width:100%;" onclick="playClickSound()">📖 Baca Sekarang (Tab Baru) ↗</a>`;

      return `
        <div class="book-card">
          <div>
            <span style="font-size:2rem;">${book.icon}</span>
            <h4 style="font-size:1.1rem; font-weight:900; margin-top:6px;">${book.title}</h4>
            <p style="font-size:0.88rem; font-weight:700; color:var(--text-muted); margin-top:4px;">${book.desc}</p>
          </div>
          <div>${actionHtml}</div>
        </div>
      `;
    }).join('');
  }
}

/* ==========================================================================
   WEB AUDIO API: EFEK SUARA KLIK & HADIAH
   ========================================================================== */
function getAudioContext() {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playClickSound() {
  if (appState.muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {}
}

function playSuccessChime() {
  if (appState.muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.09 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.09);
      osc.stop(ctx.currentTime + idx * 0.09 + 0.19);
    });
  } catch (e) {}
}

/* ==========================================================================
   KONFETI FLAT & NOTIFIKASI TOAST
   ========================================================================== */
function launchFlatConfetti() {
  const container = document.getElementById('confettiLayer');
  if (!container) return;
  const colors = ['#3B82F6', '#FACC15', '#22C55E', '#FB923C', '#F472B6'];
  for (let i = 0; i < 28; i++) {
    const piece = document.createElement('div');
    piece.className = 'flat-confetti-piece';
    piece.style.left = Math.random() * 96 + 'vw';
    piece.style.backgroundColor = colors[i % colors.length];
    piece.style.borderRadius = i % 2 === 0 ? '50%' : '4px';
    piece.style.animationDuration = (1.2 + Math.random() * 1.1) + 's';
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 2400);
  }
}

function hideRewardToast() {
  const toast = document.getElementById('rewardToast');
  if (!toast) return;
  toast.classList.remove('show');
  clearTimeout(toastTimer);
}

function showRewardToast(message) {
  const toast = document.getElementById('rewardToast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

/* ==========================================================================
   LOCALSTORAGE, SISTEM BINTANG, PETA PETUALANGAN, & LENCANA
   ========================================================================== */
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      appState = {
        ...appState,
        ...parsed,
        badges: { ...appState.badges, ...(parsed.badges || {}) },
        checklist: { ...appState.checklist, ...(parsed.checklist || {}) }
      };
    }
  } catch (e) {}
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState)); } catch (e) {}
}

function navigateToSection(sectionId) {
  playClickSound();
  visitSection(sectionId);
  const target = document.getElementById(sectionId);
  if (target) {
    // Sembunyikan navbar agar tidak menutupi judul Pos yang dituju
    hideNavbarTemporarily();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ==========================================================================
   NAVBAR OTOMATIS SEMBUNYI SAAT SCROLL KE BAWAH (HEMAT LAYAR HP)
   ========================================================================== */
let lastScrollY = 0;
let navLockUntil = 0;

function hideNavbarTemporarily() {
  const header = document.querySelector('.sticky-header');
  if (!header) return;
  header.classList.add('nav-hidden');
  navLockUntil = Date.now() + 1000; // abaikan arah scroll selama animasi scroll halus
}

function initAutoHideNavbar() {
  const header = document.querySelector('.sticky-header');
  if (!header) return;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const diff = y - lastScrollY;

      if (y < 80) {
        // Di bagian paling atas halaman: navbar selalu tampil
        header.classList.remove('nav-hidden');
        lastScrollY = y;
      } else if (Math.abs(diff) > 8) {
        if (Date.now() > navLockUntil) {
          header.classList.toggle('nav-hidden', diff > 0); // turun = sembunyi, naik = tampil
        }
        lastScrollY = y;
      }
      ticking = false;
    });
  }, { passive: true });
}

function visitSection(sectionId) {
  if (!ALL_SECTIONS.includes(sectionId)) return;

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === sectionId);
  });

  if (CLASS_DATA.mascotGreetings[sectionId]) {
    const mascotText = document.getElementById('mascotMessageText');
    if (mascotText) mascotText.innerHTML = CLASS_DATA.mascotGreetings[sectionId];
  }

  if (!appState.visitedSections.includes(sectionId)) {
    appState.visitedSections.push(sectionId);
    playSuccessChime();
    launchFlatConfetti();
    showRewardToast(`⭐ Hebat! Kamu membuka Pos baru (${appState.visitedSections.length}/5 Bintang)!`);

    if (appState.visitedSections.length >= ALL_SECTIONS.length && !appState.badges.explorer) {
      appState.badges.explorer = true;
      setTimeout(() => {
        playSuccessChime();
        launchFlatConfetti();
        showRewardToast('🏅 Lencana Baru Terbuka: "Penjelajah Hebat"!');
        updateUI();
      }, 1600);
    }
    saveState();
  }
  updateUI();
}

function unlockQuizBadge() {
  playSuccessChime();
  launchFlatConfetti();
  if (!appState.badges.quizChamp) {
    appState.badges.quizChamp = true;
    saveState();
    showRewardToast('🏆 Selamat! Kamu meraih Lencana "Juara Kuis"!');
    updateUI();
  } else {
    showRewardToast('🚀 Semangat mengerjakan Kuis Pancaindra!');
  }
}

function updateUI() {
  const starsCount = appState.visitedSections.length;
  const checkDoneCount = Object.values(appState.checklist).filter(Boolean).length;
  const badgeDoneCount = (appState.badges.explorer ? 1 : 0) + (appState.badges.quizChamp ? 1 : 0);

  const starCountText = document.getElementById('starCountText');
  if (starCountText) starCountText.textContent = `${starsCount} / ${ALL_SECTIONS.length}`;

  const progressPct = Math.min(100, Math.round(((starsCount + checkDoneCount + badgeDoneCount) / 11) * 100));
  const topBar = document.getElementById('topProgressBar');
  if (topBar) topBar.style.width = `${Math.max(15, progressPct)}%`;

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('visited', appState.visitedSections.includes(btn.dataset.nav));
  });

  document.querySelectorAll('.map-pos-card').forEach(card => {
    const isVisited = appState.visitedSections.includes(card.dataset.mapPos);
    card.classList.toggle('visited', isVisited);
    const tag = card.querySelector('.pos-status-tag');
    if (tag) tag.textContent = isVisited ? '✓ Sudah Dikunjungi' : '🔒 Klik untuk Buka';
  });

  const mapProgressText = document.getElementById('mapProgressText');
  if (mapProgressText) mapProgressText.textContent = `Pos Terbuka: ${starsCount} / ${ALL_SECTIONS.length}`;

  let completedChecks = 0;
  document.querySelectorAll('.checklist-row').forEach(row => {
    const isChecked = !!appState.checklist[row.dataset.checkId];
    if (isChecked) completedChecks++;
    row.classList.toggle('checked', isChecked);
    const box = row.querySelector('.custom-checkbox');
    if (box) box.textContent = isChecked ? '✓' : '';
  });

  const checklistCounter = document.getElementById('checklistCounter');
  if (checklistCounter) checklistCounter.textContent = `${completedChecks} / 4 Selesai`;

  const explorerCard = document.getElementById('badgeExplorerCard');
  const explorerStatus = document.getElementById('badgeExplorerStatus');
  if (explorerCard && explorerStatus) {
    explorerCard.classList.toggle('unlocked', appState.badges.explorer);
    explorerStatus.textContent = appState.badges.explorer ? '✓ Lencana Terbuka!' : '🔒 Belum Terbuka';
  }

  const quizCard = document.getElementById('badgeQuizCard');
  const quizStatus = document.getElementById('badgeQuizStatus');
  if (quizCard && quizStatus) {
    quizCard.classList.toggle('unlocked', appState.badges.quizChamp);
    quizStatus.textContent = appState.badges.quizChamp ? '✓ Lencana Terbuka!' : '🔒 Belum Terbuka';
  }

  const gameStar = document.getElementById('gameCardStarDisplay');
  const gameBadge = document.getElementById('gameCardBadgeDisplay');
  if (gameStar) gameStar.textContent = `⭐ ${starsCount} / 5`;
  if (gameBadge) gameBadge.textContent = `🏅 ${badgeDoneCount} / 2`;

  document.documentElement.setAttribute('data-theme', appState.theme);
  document.documentElement.setAttribute('data-accent', appState.accent);

  const themeIcon = document.getElementById('themeToggleIcon');
  const themeText = document.getElementById('themeToggleText');
  if (themeIcon && themeText) {
    themeIcon.textContent = appState.theme === 'dark' ? '☀️' : '🌙';
    themeText.textContent = appState.theme === 'dark' ? 'Terang' : 'Gelap';
  }

  const soundIcon = document.getElementById('soundToggleIcon');
  const soundText = document.getElementById('soundToggleText');
  if (soundIcon && soundText) {
    soundIcon.textContent = appState.muted ? '🔇' : '🔊';
    soundText.textContent = appState.muted ? 'Bisu' : 'Suara';
  }

  document.querySelectorAll('.color-dot').forEach(dot => {
    const onclickAttr = dot.getAttribute('onclick') || '';
    dot.classList.toggle('active', onclickAttr.includes(`'${appState.accent}'`));
  });
}

/* ==========================================================================
   CHECKLIST, KARTU FLIP, ACCORDION, & MINI KUIS KILAT
   ========================================================================== */
function toggleChecklist(checkId) {
  playClickSound();
  appState.checklist[checkId] = !appState.checklist[checkId];
  if (appState.checklist[checkId]) playSuccessChime();
  saveState();
  updateUI();
}

function flipCard(cardEl) {
  playClickSound();
  cardEl.classList.toggle('is-flipped');
}

function toggleAccordion(triggerBtn) {
  playClickSound();
  const item = triggerBtn.closest('.accordion-item');
  if (item) item.classList.toggle('open');
}

function answerMiniQuiz(qIndex, isCorrect, btnEl) {
  const card = btnEl.closest('.quiz-question-card');
  const feedbackEl = document.getElementById(`qFeedback${qIndex}`);
  if (!card || !feedbackEl) return;

  card.querySelectorAll('.quiz-opt-btn').forEach(b => b.classList.remove('correct', 'wrong'));
  feedbackEl.style.display = 'block';

  if (isCorrect) {
    playSuccessChime();
    btnEl.classList.add('correct');
    feedbackEl.style.backgroundColor = 'var(--green)';
    feedbackEl.style.color = '#052E16';
    feedbackEl.textContent = 'Hebat! 🎉 Jawaban kamu benar sekali!';
    miniQuizState[qIndex] = true;
  } else {
    playClickSound();
    btnEl.classList.add('wrong');
    feedbackEl.style.backgroundColor = 'var(--orange)';
    feedbackEl.style.color = '#431407';
    feedbackEl.textContent = 'Coba lagi ya! 💪 Ayo pilih jawaban lain yang paling tepat!';
    if (miniQuizState[qIndex] !== true) miniQuizState[qIndex] = false;
  }
  updateMiniQuizScore();
}

function updateMiniQuizScore() {
  const correctCount = Object.values(miniQuizState).filter(v => v === true).length;
  const answeredCount = Object.values(miniQuizState).filter(v => v !== null).length;
  const finalScore = Math.round((correctCount / 3) * 100);

  const scoreText = document.getElementById('miniQuizScoreText');
  const statusText = document.getElementById('miniQuizStatusText');
  if (scoreText) scoreText.textContent = `🎯 Skor Akhir Kamu: ${correctCount} / 3 Benar (Nilai: ${finalScore})`;

  if (statusText) {
    if (correctCount === 3) {
      statusText.textContent = '🎉 Luar Biasa! Semua 3 soal dijawab dengan benar! Kamu berhak mendapat Lencana Juara Kuis!';
      if (!appState.badges.quizChamp) unlockQuizBadge();
    } else if (answeredCount > 0) {
      statusText.textContent = 'Terus semangat! Kamu bisa mencoba klik pilihan jawaban sampai semuanya benar!';
    } else {
      statusText.textContent = 'Ayo pilih jawaban pada ketiga soal di atas!';
    }
  }
}

function resetMiniQuiz() {
  playClickSound();
  miniQuizState = { 0: null, 1: null, 2: null };
  document.querySelectorAll('.quiz-opt-btn').forEach(btn => btn.classList.remove('correct', 'wrong'));
  document.querySelectorAll('.quiz-feedback').forEach(fb => { fb.style.display = 'none'; fb.textContent = ''; });
  updateMiniQuizScore();
}

/* ==========================================================================
   BACA NYARING (WEB SPEECH API id-ID), MASKOT, & PENGATURAN TEMA
   ========================================================================== */
function speakText(text, btnEl) {
  playClickSound();
  if (!('speechSynthesis' in window)) {
    showRewardToast('🔊 Browser ini belum mendukung fitur Baca Nyaring.');
    return;
  }
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
    document.querySelectorAll('.tts-btn.speaking').forEach(b => b.classList.remove('speaking'));
    if (btnEl && btnEl.dataset.currentlySpeaking === 'true') {
      btnEl.dataset.currentlySpeaking = 'false';
      return;
    }
  }
  document.querySelectorAll('.tts-btn').forEach(b => {
    b.classList.remove('speaking');
    b.dataset.currentlySpeaking = 'false';
  });

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.95;
  utterance.pitch = 1.08;

  if (btnEl && btnEl.classList.contains('tts-btn')) {
    btnEl.classList.add('speaking');
    btnEl.dataset.currentlySpeaking = 'true';
  }
  utterance.onend = () => {
    if (btnEl) {
      btnEl.classList.remove('speaking');
      btnEl.dataset.currentlySpeaking = 'false';
    }
  };
  synth.speak(utterance);
}

function resetMascotAutoHide() {
  clearTimeout(mascotTimer);
  mascotTimer = setTimeout(() => {
    const bubble = document.getElementById('mascotBubble');
    if (bubble) bubble.classList.remove('open');
  }, 6000);
}

function toggleMascotBubble() {
  playClickSound();
  const bubble = document.getElementById('mascotBubble');
  if (!bubble) return;

  if (bubble.classList.contains('open')) {
    bubble.classList.remove('open');
    clearTimeout(mascotTimer);
  } else {
    bubble.classList.add('open');
    resetMascotAutoHide();
  }
}

function nextRandomMascotTip() {
  playClickSound();
  const mascotText = document.getElementById('mascotMessageText');
  if (!mascotText) return;
  mascotText.innerHTML = `<strong>${CLASS_DATA.mascotTips[tipIndex]}</strong>`;
  tipIndex = (tipIndex + 1) % CLASS_DATA.mascotTips.length;
  resetMascotAutoHide();
}

function setAccentColor(colorName) {
  playClickSound();
  appState.accent = colorName;
  saveState();
  updateUI();
}

function toggleDarkMode() {
  playClickSound();
  appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
  saveState();
  updateUI();
}

function toggleMute() {
  appState.muted = !appState.muted;
  if (!appState.muted) playClickSound();
  saveState();
  updateUI();
}

let isResettingScroll = false;

function resetAllProgress() {
  playClickSound();
  isResettingScroll = true;

  appState.visitedSections = ['beranda'];
  appState.badges = { explorer: false, quizChamp: false };
  appState.checklist = { c1: false, c2: false, c3: false, c4: false };
  saveState();
  resetMiniQuiz();

  // Setel navigasi aktif dan pesan maskot kembali ke Pos 1 (Beranda)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === 'beranda');
  });
  if (CLASS_DATA.mascotGreetings.beranda) {
    const mascotText = document.getElementById('mascotMessageText');
    if (mascotText) mascotText.innerHTML = CLASS_DATA.mascotGreetings.beranda;
  }

  updateUI();
  showRewardToast('🔄 Progress belajar direset! Kembali ke Pos 1 Beranda.');

  // Kembali ke atas (Pos 1: Beranda)
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(() => {
    isResettingScroll = false;
  }, 1000);
}

function initScrollObserver() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    if (isResettingScroll) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const secId = entry.target.getAttribute('data-section');
        if (secId && (secId === 'beranda' || window.scrollY > 120)) visitSection(secId);
      }
    });
  }, { threshold: 0.28 });

  document.querySelectorAll('.page-section').forEach(section => observer.observe(section));
}

window.addEventListener('DOMContentLoaded', () => {
  renderDynamicComponents();
  loadState();
  updateUI();
  initScrollObserver();
  initAutoHideNavbar();

  document.addEventListener('click', (e) => {
    const widget = document.querySelector('.mascot-widget');
    const bubble = document.getElementById('mascotBubble');
    if (widget && bubble && bubble.classList.contains('open') && !widget.contains(e.target)) {
      bubble.classList.remove('open');
      clearTimeout(mascotTimer);
    }
  });
});
