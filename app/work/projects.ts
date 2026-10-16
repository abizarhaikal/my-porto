export const projectIds = ["wms", "dice", "trailoo"] as const;
export type ProjectId = (typeof projectIds)[number];
export type Language = "en" | "id";

export const detail = {
  en: {
    view: "View project", close: "Back to portfolio", contribution: "My contribution", context: "The context", built: "What I worked on",
    note: "This interface was recreated for the portfolio. Internal screens and data are not shown.",
    wms: ["An internal Warehouse Management System for vehicle queues and warehouse capacity. I have worked on its web interfaces since January 2026.", ["Vehicle-queue summaries, filters, and detail views", "Warehouse layout and capacity-management interfaces", "React Router data loading and REST API integration"]],
    dice: ["Aktivasi Budaya is an internal activity-reporting platform. Before a report is submitted, its photos can be checked against existing reference images through a separate Python service. I have worked on the application and image-analysis integration since March 2026.", ["Activity report form with per-photo check results before submission", "Next.js API integration that selects reference images and sends photo batches to FastAPI", "Python comparison service using file and EXIF checks plus OpenCV ORB"]],
    trailoo: ["TRAILOO is a smart trolley with indoor navigation and tablet checkout. I worked on its dashboards from August to November 2025. The project received national PKM-KI 2025 funding.", ["Responsive web and tablet dashboards", "Navigation-update API integration", "Transaction-monitoring interfaces"]],
  },
  id: {
    view: "Lihat proyek", close: "Kembali ke portofolio", contribution: "Kontribusi saya", context: "Konteks proyek", built: "Yang saya kerjakan",
    note: "Antarmuka ini dibuat ulang untuk portofolio. Tampilan dan data internal tidak ditampilkan.",
    wms: ["Warehouse Management System internal untuk antrean kendaraan dan kapasitas gudang. Saya mengerjakan antarmuka webnya sejak Januari 2026.", ["Ringkasan, filter, dan detail antrean kendaraan", "Antarmuka layout dan pengelolaan kapasitas gudang", "Pemuatan data React Router dan integrasi REST API"]],
    dice: ["Aktivasi Budaya adalah platform internal untuk pelaporan kegiatan. Sebelum laporan dikirim, foto dapat diperiksa terhadap gambar referensi melalui layanan Python terpisah. Saya mengerjakan aplikasi dan integrasi analisis gambar sejak Maret 2026.", ["Form laporan kegiatan dengan hasil pemeriksaan per foto sebelum pengiriman", "Integrasi API Next.js yang memilih gambar referensi dan mengirim kumpulan foto ke FastAPI", "Layanan pembanding gambar berbasis pemeriksaan file dan EXIF serta OpenCV ORB"]],
    trailoo: ["TRAILOO adalah smart trolley dengan navigasi dalam ruangan dan checkout melalui tablet. Saya mengerjakan dashboard-nya pada Agustus–November 2025. Proyek ini mendapat pendanaan nasional PKM-KI 2025.", ["Dashboard web dan tablet yang responsif", "Integrasi API pembaruan navigasi", "Antarmuka pemantauan transaksi"]],
  },
} as const;

export const projectInfo = {
  wms: {
    name: "WMS",
    title: { en: "Warehouse dashboards and inbound workflows.", id: "Dashboard gudang dan alur penerimaan barang." },
    stack: "React Router · TypeScript · HeroUI",
  },
  dice: {
    name: "DICE",
    title: { en: "Image analysis for activity reporting.", id: "Analisis gambar untuk pelaporan kegiatan." },
    stack: "Python · FastAPI · OpenCV ORB",
  },
  trailoo: {
    name: "TRAILOO",
    title: { en: "Web and tablet dashboards for a smart trolley.", id: "Dashboard web dan tablet untuk smart trolley." },
    stack: "Next.js · API integration · PKM-KI 2025",
  },
} as const;

export const wmsArticle = {
  en: {
    intro: "Warehouse work crosses several views: a vehicle arriving at the gate, an inbound process that needs checking, and storage space that has to be accounted for. The WMS web app brings those operational views into one interface for different user roles.",
    challengeTitle: "The challenge",
    challenge: "A queue number alone does not tell staff what is happening to a vehicle or where its goods will go. The interface needs to connect queue status, vehicle and product details, quality and weighing records, and the warehouse's available capacity without exposing the same navigation to every role.",
    flowTitle: "From gate to warehouse",
    flow: [
      { label: "01 / Monitor", text: "The vehicle view loads a daily summary and queue list from the API, with filters for dates, activity, warehouse, and other relevant fields." },
      { label: "02 / Inspect", text: "A queue detail page brings together vehicle information, inbound products, supporting photos, and a timeline of the operational stages." },
      { label: "03 / Check", text: "Linked QC and weighing views show the inspection results and sampling records associated with an inbound product." },
      { label: "04 / Allocate", text: "Warehouse management shows capacity and utilization, with layout units and stack locations that can be reviewed and edited." },
    ],
    decisionsTitle: "One interface, different roles",
    decisions: "The app uses React Router loaders to check the session and request operational data before rendering a route. Its navigation changes with the user's role, while individual views select the fields and actions relevant to that workflow. The frontend consumes an existing REST API rather than storing warehouse records itself.",
    methodTitle: "A layout that reflects physical space",
    method: "Warehouse management represents units and cells from a saved layout configuration. The interface calculates and displays capacity and utilization, and supports edits to units, stacks, and capacity values. After a save, it reloads the route data so the view reflects the API response.",
    outcomeTitle: "What the interface makes visible",
    outcome: "Staff can move from a filtered vehicle queue into the relevant detail and inspection views, then inspect warehouse layout and capacity in the same web app. This case study describes the implemented interfaces and API connections; it does not claim measured operational improvements.",
  },
  id: {
    intro: "Pekerjaan gudang melintasi beberapa tampilan: kendaraan yang datang ke gerbang, proses barang masuk yang perlu diperiksa, dan ruang penyimpanan yang harus dicatat. Aplikasi web WMS menyatukan tampilan operasional tersebut untuk pengguna dengan peran berbeda.",
    challengeTitle: "Tantangannya",
    challenge: "Nomor antrean saja belum menjelaskan apa yang sedang terjadi pada kendaraan atau ke mana barangnya akan ditempatkan. Antarmuka perlu menghubungkan status antrean, detail kendaraan dan produk, hasil QC dan uji timbang, serta kapasitas gudang yang tersedia, dengan navigasi yang sesuai untuk tiap peran.",
    flowTitle: "Dari gerbang ke gudang",
    flow: [
      { label: "01 / Pantau", text: "Tampilan kendaraan memuat ringkasan harian dan daftar antrean dari API, dengan filter tanggal, kegiatan, gudang, serta atribut terkait." },
      { label: "02 / Periksa", text: "Halaman detail antrean menggabungkan informasi kendaraan, produk barang masuk, foto pendukung, dan linimasa tahapan operasional." },
      { label: "03 / Cek hasil", text: "Tampilan QC dan uji timbang yang terhubung memperlihatkan hasil pemeriksaan serta catatan sampling untuk produk barang masuk." },
      { label: "04 / Atur ruang", text: "Manajemen gudang menampilkan kapasitas dan utilisasi, serta unit layout dan lokasi tumpukan yang dapat ditinjau dan diubah." },
    ],
    decisionsTitle: "Satu antarmuka, beberapa peran",
    decisions: "Aplikasi memakai loader React Router untuk memeriksa sesi dan mengambil data operasional sebelum route ditampilkan. Navigasinya menyesuaikan peran pengguna, sementara tiap tampilan memilih data dan aksi yang relevan. Frontend memakai REST API yang sudah ada, bukan menyimpan catatan gudang sendiri.",
    methodTitle: "Layout yang mewakili ruang fisik",
    method: "Manajemen gudang merepresentasikan unit dan sel dari konfigurasi layout yang tersimpan. Antarmuka menghitung dan menampilkan kapasitas serta utilisasi, juga mendukung perubahan unit, tumpukan, dan nilai kapasitas. Setelah penyimpanan, data route dimuat ulang agar tampilan mengikuti respons API.",
    outcomeTitle: "Apa yang terlihat di antarmuka",
    outcome: "Petugas dapat berpindah dari antrean kendaraan yang difilter ke detail dan hasil pemeriksaan terkait, lalu meninjau layout serta kapasitas gudang dalam aplikasi web yang sama. Studi kasus ini menjelaskan antarmuka dan integrasi API yang ada, tanpa mengklaim peningkatan operasional yang belum diukur.",
  },
} as const;

export const diceArticle = {
  en: {
    intro: "A photo is part of an activity report, but a familiar-looking image is difficult to judge from a thumbnail alone. DICE adds an image check to the reporting flow so a submitter can review a flagged photo before sending the report for approval.",
    challengeTitle: "The challenge",
    challenge: "Activity reports combine a program, date, location, description, and photographic evidence. The check needed to compare new uploads with photos already held by the application, while respecting which reference reports a user is allowed to access. It also had to give a useful result for each photo instead of returning one opaque answer for the whole upload.",
    flowTitle: "From upload to decision",
    flow: [
      { label: "01 / Prepare", text: "The reporting form collects activity details and photos. The user starts the image check before final submission." },
      { label: "02 / Compare", text: "A Next.js route gathers permitted reference photos and sends the new images and reference URLs to a separate FastAPI service." },
      { label: "03 / Analyze", text: "The Python service checks exact duplicates and image metadata, then compares visual features using OpenCV ORB across flipped, rotated, and color-normalized variants." },
      { label: "04 / Review", text: "The service returns a result for each photo. Flagged images are shown in the form and must be removed or replaced before the report can be submitted." },
    ],
    decisionsTitle: "Why a separate image service?",
    decisions: "The web application handles the report workflow, access checks, and reference selection. The Python API handles image validation and comparison. Keeping those responsibilities separate lets the reporting UI consume a per-image result without carrying computer-vision code into the Next.js route.",
    methodTitle: "A signal for review, not a verdict",
    method: "The comparison combines exact-file and EXIF checks with ORB feature matching. The ORB pass looks for structural matches even when an image has been flipped, rotated, or adjusted in brightness. The returned score and reference match help surface suspicious reuse; they are indicators to review, not proof of intent or a measured accuracy claim.",
    outcomeTitle: "What the workflow delivers",
    outcome: "The submitter sees which photo needs attention before sending the report. Validated photos can continue through the existing activity-report workflow, where the report and its review history remain available. This case study describes the implemented flow; it does not claim a quantified reduction in fraud.",
  },
  id: {
    intro: "Foto menjadi bagian dari laporan kegiatan, tetapi kemiripan gambar sulit dinilai hanya dari thumbnail. DICE menambahkan pemeriksaan gambar ke alur pelaporan agar pelapor dapat meninjau foto yang ditandai sebelum mengirim laporan untuk persetujuan.",
    challengeTitle: "Tantangannya",
    challenge: "Laporan kegiatan menggabungkan program, tanggal, lokasi, deskripsi, dan bukti foto. Pemeriksaan perlu membandingkan unggahan baru dengan foto yang sudah tersimpan, sambil mengikuti batas akses laporan referensi milik pengguna. Hasilnya juga perlu jelas untuk tiap foto, bukan satu jawaban umum untuk seluruh unggahan.",
    flowTitle: "Dari unggahan ke hasil pemeriksaan",
    flow: [
      { label: "01 / Siapkan", text: "Formulir mengumpulkan rincian kegiatan dan foto. Pengguna menjalankan pemeriksaan gambar sebelum submit akhir." },
      { label: "02 / Bandingkan", text: "Route Next.js mengambil foto referensi yang boleh diakses lalu mengirim foto baru dan URL referensi ke layanan FastAPI terpisah." },
      { label: "03 / Analisis", text: "Layanan Python memeriksa duplikat persis dan metadata gambar, lalu membandingkan fitur visual memakai OpenCV ORB pada variasi flip, rotasi, dan normalisasi warna." },
      { label: "04 / Tinjau", text: "Layanan mengembalikan hasil per foto. Foto yang ditandai tampil di formulir dan harus dihapus atau diganti sebelum laporan bisa dikirim." },
    ],
    decisionsTitle: "Mengapa layanan gambar dipisah?",
    decisions: "Aplikasi web menangani alur laporan, pemeriksaan akses, dan pemilihan referensi. API Python menangani validasi serta perbandingan gambar. Pemisahan ini membuat antarmuka pelaporan cukup memakai hasil per foto tanpa membawa kode computer vision ke route Next.js.",
    methodTitle: "Sinyal untuk ditinjau, bukan vonis",
    method: "Pemeriksaan menggabungkan hash file dan metadata EXIF dengan pencocokan fitur ORB. ORB mencari kemiripan struktur meskipun gambar dibalik, diputar, atau diubah kecerahannya. Skor dan foto referensi yang dikembalikan membantu menandai kemungkinan penggunaan ulang; hasil ini bukan bukti niat curang atau klaim akurasi terukur.",
    outcomeTitle: "Hasil untuk alur kerja",
    outcome: "Pelapor dapat melihat foto mana yang perlu ditangani sebelum mengirim laporan. Foto yang lolos dapat melanjutkan alur laporan kegiatan, dengan data laporan dan riwayat peninjauannya tetap tersedia. Studi kasus ini menjelaskan alur yang dibangun, tanpa mengklaim angka penurunan kecurangan.",
  },
} as const;
