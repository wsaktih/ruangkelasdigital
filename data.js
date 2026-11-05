/* ==========================================================================
   PUSAT DATA & KONTEN PORTOFOLIO GURU SD (MUDAH DIEDIT)
   Ubah nama SD, topik, materi, soal kuis, atau tautan Pojok Baca di sini.
   ========================================================================== */
const CLASS_DATA = {
  teacherName: 'Aulia Nur Khasanah',
  // GANTI NAMA SD DI SINI:
  className: 'Kelas 2 SD',
  subjectName: 'IPA (Ilmu Pengetahuan Alam)',
  // GANTI TOPIK PEMBELAJARAN DI SINI:
  topicTitle: 'Mesin Sempurna Bernama Tubuh Manusia (Panduan Visual Pancaindra: Cara Kita Memahami Dunia)',

  // Tautan Utama Media & Modul
  links: {
    modulAjar: 'https://notebook.google.com/notebook/b46c8d11-c4f8-4a72-8502-8f5890f9228b/artifact/333901a3-d4f0-47ed-81d0-302fcff7cb8d?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_',
    pptOriginal: 'https://docs.google.com/presentation/d/1DZlJF7izReY3BrsC9PWZGb5XGioMGCtf/edit?usp=drivesdk&ouid=115433262386830587453&rtpof=true&sd=true',
    pptEmbed: 'https://docs.google.com/presentation/d/1DZlJF7izReY3BrsC9PWZGb5XGioMGCtf/embed',
    lkpdCanva: 'https://canva.link/aqosdaz4ie1cg13',
    posterNotebookLM: 'https://notebook.google.com/notebook/b46c8d11-c4f8-4a72-8502-8f5890f9228b/artifact/d29e7246-e15a-4d1d-a6fe-39af01849476?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_',
    youtubeEmbed: 'https://www.youtube.com/embed/SFJQqaKpI-s',
    youtubeWatch: 'https://www.youtube.com/watch?v=SFJQqaKpI-s',
    googleClassroom: 'https://classroom.google.com/c/ODk3Mzk4ODIxNTk5?cjc=vjbnqx3x',
    waygroundQuiz: 'https://wayground.com/join?gc=24229731'
  },

  // 7 Pos Peta Petualangan di Beranda
  adventureMap: [
    { id: 'beranda',    num: 1, title: 'Pos 1: Beranda', desc: 'Sapaan Bu Aulia & Peta Kelas' },
    { id: 'mapel',      num: 2, title: 'Pos 2: Info Mapel', desc: 'Pancaindra, Kartu Flip & Kuis Kilat' },
    { id: 'modul',      num: 3, title: 'Pos 3: Modul Ajar', desc: 'Rencana Belajar & NotebookLM' },
    { id: 'presentasi', num: 4, title: 'Pos 4: PPT & LKPD', desc: 'Slide Interaktif & Canva' },
    { id: 'video',      num: 5, title: 'Pos 5: Video & Poster', desc: 'Video YouTube & Infografis' },
    { id: 'classroom',  num: 6, title: 'Pos 6: Kelas & Baca', desc: 'Google Classroom & Pojok Baca' },
    { id: 'asesmen',    num: 7, title: 'Pos 7: Asesmen Game', desc: 'Kuis Wayground & Lencana' }
  ],

  // 5 Kartu Visual Pancaindra
  senses: [
    {
      title: '1. Mata (Penglihat)',
      desc: 'Melihat warna, bentuk, cahaya, dan keindahan dunia.',
      tts: 'Mata adalah indra penglihat. Dengan mata, kita bisa melihat warna-warni pelangi, membaca buku, dan melihat wajah teman.',
      bg: 'var(--blue)',
      svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M2 12C4.5 7 8 4.5 12 4.5C16 4.5 19.5 7 22 12C19.5 17 16 19.5 12 19.5C8 19.5 4.5 17 2 12Z" fill="#FFFFFF" stroke="#1E293B" stroke-width="2.2"/><circle cx="12" cy="12" r="4" fill="#3B82F6" stroke="#1E293B" stroke-width="2"/><circle cx="12" cy="12" r="1.5" fill="#1E293B"/></svg>'
    },
    {
      title: '2. Telinga (Pendengar)',
      desc: 'Mendengar suara lembut, nyaring, lagu, dan panggilan.',
      tts: 'Telinga adalah indra pendengar. Dengan telinga, kita bisa mendengar suara guru, musik yang merdu, dan kicau burung.',
      bg: 'var(--yellow)',
      svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M7 10C7 6.5 9.5 4 13 4C16.5 4 19 6.5 19 10C19 13.5 16 15 15 17.5C14.3 19.2 12.8 20 11 20C9 20 8 18.5 8 17" fill="#FFFFFF" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round"/><path d="M11 10C11 8.5 12 7.5 13.5 7.5C15 7.5 16 8.5 16 10C16 11.5 14 12.5 13 14" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round"/></svg>'
    },
    {
      title: '3. Hidung (Pembau)',
      desc: 'Mencium bau harum bunga atau bau tidak sedap.',
      tts: 'Hidung adalah indra pembau. Dengan hidung, kita bisa menghirup udara segar dan mencium aroma masakan ibu.',
      bg: 'var(--green)',
      svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M12 4V14C12 14 7 15 7 18C7 19.5 9 20 12 20C15 20 17 19.5 17 18C17 15 12 14 12 14Z" fill="#FFFFFF" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/><circle cx="10" cy="18" r="1.2" fill="#1E293B"/><circle cx="14" cy="18" r="1.2" fill="#1E293B"/></svg>'
    },
    {
      title: '4. Lidah (Pengecap)',
      desc: 'Merasakan manis, asin, asam, dan pahit makanan.',
      tts: 'Lidah adalah indra pengecap. Dengan lidah, kita bisa merasakan rasa manis, asin, asam, dan pahit pada makanan.',
      bg: 'var(--pink)',
      svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M6 9H18C18 15 15.5 20 12 20C8.5 20 6 15 6 9Z" fill="#FFFFFF" stroke="#1E293B" stroke-width="2.2"/><path d="M12 9V16" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round"/></svg>'
    },
    {
      title: '5. Kulit (Peraba)',
      desc: 'Merasakan tekstur halus, kasar, dingin, dan hangat.',
      tts: 'Kulit adalah indra peraba. Dengan kulit, kita bisa merasakan benda yang halus, kasar, dingin, atau hangat.',
      bg: 'var(--orange)',
      svg: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M8 13V6.5C8 5.7 8.7 5 9.5 5C10.3 5 11 5.7 11 6.5V11M11 11V5.5C11 4.7 11.7 4 12.5 4C13.3 4 14 4.7 14 5.5V11M14 11V6.5C14 5.7 14.7 5 15.5 5C16.3 5 17 5.7 17 6.5V15C17 18.3 14.3 21 11 21C7.7 21 5 18.3 5 15V11.5C5 10.7 5.7 10 6.5 10C7.3 10 8 10.7 8 11.5V13Z" fill="#FFFFFF" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/></svg>'
    }
  ],

  // Checklist Belajar di Rumah (tersimpan di localStorage)
  homeChecklist: [
    { id: 'c1', text: 'Menyebutkan 5 pancaindra beserta fungsinya di depan Ayah/Bunda' },
    { id: 'c2', text: 'Mencuci tangan dengan sabun dan menggosok gigi serta lidah' },
    { id: 'c3', text: 'Menonton video pembelajaran pancaindra di Galeri Media' },
    { id: 'c4', text: 'Mengerjakan LKPD Digital dan Kuis Game Pancaindra' }
  ],

  // Kartu Flip Istilah Penting IPA
  flipCards: [
    { icon: '🖐️', term: 'Pancaindra', meaning: 'Lima alat bantu pada tubuh manusia (mata, telinga, hidung, lidah, kulit) untuk mengenal lingkungan sekitar.' },
    { icon: '👁️', term: 'Indra Penglihat', meaning: 'Yaitu <strong>Mata</strong>! Gunanya untuk melihat cahaya, warna, gambar, dan membaca tulisan.' },
    { icon: '👅', term: 'Indra Pengecap', meaning: 'Yaitu <strong>Lidah</strong>! Gunanya untuk merasakan rasa manis, asin, asam, dan pahit.' },
    { icon: '✋', term: 'Tekstur Benda', meaning: 'Sifat permukaan benda yang bisa diraba oleh <strong>Kulit</strong>, seperti halus, lembut, atau kasar.' }
  ],

  // Mini Kuis Kilat 3 Soal Pilihan Ganda
  miniQuiz: [
    {
      question: '1. Ketika Ibu memasak kue di dapur, kita bisa mencium bau harumnya menggunakan...',
      options: [
        { label: 'A. Telinga 👂', correct: false },
        { label: 'B. Hidung 👃', correct: true },
        { label: 'C. Mata 👀', correct: false }
      ]
    },
    {
      question: '2. Bagian tubuh manakah yang membantu kita merasakan manisnya madu dan asamnya jeruk?',
      options: [
        { label: 'A. Lidah 👅', correct: true },
        { label: 'B. Kulit ✋', correct: false },
        { label: 'C. Hidung 👃', correct: false }
      ]
    },
    {
      question: '3. Saat kita menyentuh bulu kucing yang halus, pancaindra apakah yang sedang bekerja?',
      options: [
        { label: 'A. Mata 👀', correct: false },
        { label: 'B. Telinga 👂', correct: false },
        { label: 'C. Kulit ✋', correct: true }
      ]
    }
  ],

  // Accordion Ringkasan Modul Ajar
  modulAccordion: [
    {
      title: '1. 📌 Identitas Modul Ajar',
      items: [
        '👩‍🏫 <strong>Nama Penyusun:</strong> Aulia Nur Khasanah',
        '🏫 <strong>Jenjang / Kelas:</strong> SD / Kelas 2 (Fase A)',
        '🔬 <strong>Mata Pelajaran:</strong> Ilmu Pengetahuan Alam (IPA)',
        '📖 <strong>Topik Utama:</strong> Mesin Sempurna Bernama Tubuh Manusia (Panduan Visual Pancaindra: Cara Kita Memahami Dunia)',
        '⏱️ <strong>Alokasi Waktu:</strong> 2 x 35 Menit (1 Pertemuan Tatap Muka / Blended Digital)'
      ]
    },
    {
      title: '2. 🦅 Profil Pelajar Pancasila',
      items: [
        '🙏 <strong>Beriman & Bertakwa kepada Tuhan YME:</strong> Bersyukur atas karunia tubuh dan pancaindra yang sempurna dengan cara merawatnya.',
        '🧐 <strong>Bernalar Kritis:</strong> Mengidentifikasi fungsi masing-masing pancaindra berdasarkan pengamatan visual dan eksperimen sederhana.',
        '💪 <strong>Mandiri:</strong> Menyelesaikan LKPD digital serta kuis asesmen secara percaya diri.',
        '🎨 <strong>Kreatif:</strong> Menceritakan pengalaman menggunakan pancaindra dalam kehidupan sehari-hari.'
      ]
    },
    {
      title: '3. 💻 Sarana & Media Pembelajaran Digital',
      items: [
        '📊 <strong>PPT Interaktif (Google Slides):</strong> Materi visual terstruktur tentang kelima indra manusia.',
        '🎨 <strong>LKPD Digital (Canva):</strong> Lembar kerja siswa interaktif bergambar penuh warna.',
        '🖼️ <strong>Poster & Modul Visual (NotebookLM):</strong> Ringkasan konsep dan infografis ramah anak.',
        '🎬 <strong>Video Pembelajaran YouTube:</strong> Animasi edukatif pengenalan fungsi pancaindra.',
        '🏫 <strong>Google Classroom & Wayground (Quizizz):</strong> Ruang kelas penugasan dan evaluasi berbasis game.'
      ]
    },
    {
      title: '4. 🧩 Model & Metode Pembelajaran',
      items: [
        '🔍 <strong>Model:</strong> Contextual Teaching and Learning (CTL) & Discovery Learning Berbasis Multimedia Interaktif.',
        '🎮 <strong>Gamifikasi (Game-Based Learning):</strong> Pengumpulan bintang, lencana, dan kuis interaktif Wayground.',
        '🤝 <strong>Metode:</strong> Eksplorasi visual/audio, tanya jawab, dan demonstrasi langsung fungsi pancaindra.'
      ]
    },
    {
      title: '5. 🎬 Skenario Kegiatan Berbasis Multimedia',
      items: [
        '🌅 <strong>Kegiatan Pendahuluan (10 Menit):</strong> Salam hangat Bu Aulia, doa bersama, lagu "Dua Mata Saya", dan apersepsi di Peta Petualangan.',
        '🚀 <strong>Kegiatan Inti (45 Menit):</strong> Menonton Video YouTube & menyimak PPT Interaktif, bermain Kartu Flip IPA, mengamati Poster Visual NotebookLM, dan mengerjakan LKPD Digital Canva.',
        '🌈 <strong>Kegiatan Penutup (15 Menit):</strong> Bermain kuis evaluasi di Wayground (Quizizz), refleksi belajar, pengumpulan tugas di Google Classroom, dan doa penutup.'
      ]
    },
    {
      title: '6. 📝 Ringkasan LKPD Digital',
      items: [
        '✏️ Mencocokkan gambar pancaindra (mata, telinga, hidung, lidah, kulit) dengan aktivitas yang sesuai.',
        '🌟 Memilih kebiasaan baik dalam merawat kesehatan pancaindra sehari-hari.'
      ]
    }
  ],

  // GANTI TAUTAN POJOK BACA DI SINI:
  // Jika url dikosongkan (""), otomatis muncul badge placeholder "⏳ Segera hadir"
  readingCorner: [
    {
      icon: '📗',
      title: '1. Buku Cerita Anak (SIBI Kemendikdasmen)',
      desc: 'Koleksi buku bacaan bergambar resmi yang aman dan menyenangkan untuk siswa SD.',
      url: 'https://buku.kemendikdasmen.go.id/'
    },
    {
      icon: '📘',
      title: '2. Ensiklopedia Sains Tubuh Manusia',
      desc: 'Fakta-fakta unik dan gambar menarik tentang cara kerja mata, telinga, dan tubuh kita.',
      url: 'https://kids.nationalgeographic.com/science/'
    },
    {
      icon: '📙',
      title: '3. Komik Sains: Detektif Pancaindra Kelas 2',
      desc: 'Cerita bergambar petualangan merawat kebersihan mata, telinga, hidung, lidah, dan kulit.',
      url: '' // <-- Isi URL di sini jika sudah tersedia (kosong = "Segera hadir")
    }
  ],

  // Sapaan Maskot berbeda untuk tiap halaman (7 Pos)
  mascotGreetings: {
    beranda:    '🦉 Si Bubi: "Selamat datang di Beranda Kelas 2 Bu Aulia! Yuk klik 7 Pos di Peta Petualangan agar bintangmu penuh!"',
    mapel:      '🦉 Si Bubi: "Di Pos 2 ini kita mengenal 5 Pancaindra! Jangan lupa balik Kartu Flip dan jawab 3 soal Mini Kuis ya!"',
    modul:      '🦉 Si Bubi: "Ini adalah Modul Ajar Bu Aulia yang dibuat dengan NotebookLM. Klik tiap baris untuk membaca isinya!"',
    presentasi: '🦉 Si Bubi: "Wah, di Pos 4 ada PPT Interaktif dan Lembar Kerja Digital Canva yang seru untuk belajar!"',
    video:      '🦉 Si Bubi: "Yuk tonton video seru tentang cara kerja 5 indra dan amati poster visual warna-warninya di Pos 5!"',
    classroom:  '🦉 Si Bubi: "Selamat datang di Pos 6! Di sini ada Google Classroom kelas kita dan pojok baca sains!"',
    asesmen:    '🦉 Si Bubi: "Saatnya jadi juara di Pos 7! Klik tombol Mulai Kuis Wayground untuk meraih lencana Juara Kuis! 🏆"'
  },

  // Tips belajar acak saat maskot diklik
  mascotTips: [
    '🦉 Tips Bubi #1: Membaca buku sebaiknya di tempat yang terang supaya mata kita tetap sehat dan tidak cepat lelah! 👀',
    '🦉 Tips Bubi #2: Jangan mendengarkan suara musik terlalu keras di dekat telinga ya, agar gendang telinga kita selalu aman! 👂',
    '🦉 Tips Bubi #3: Saat flu, tutup hidung dan mulut ketika bersin, lalu cuci tangan dengan sabun hingga bersih! 👃🧼',
    '🦉 Tips Bubi #4: Ketika menyikat gigi pagi dan malam, sikat juga permukaan lidah secara lembut agar tetap bersih! 👅✨',
    '🦉 Tips Bubi #5: Mandi dua kali sehari dan minum air putih yang cukup membuat kulit kita segar dan sehat! ✋💧',
    '🦉 Tips Bubi #6: Kumpulkan ketujuh bintang dengan mengunjungi Pos 1 sampai Pos 7 untuk membuka lencana Penjelajah Hebat! ⭐'
  ]
};

