import { NextRequest, NextResponse } from "next/server";

type Answer =
  | { type: "choice"; options: string[] }
  | { type: "write"; placeholder: string };

type Case = {
  id: string;
  title: string;
  brief: string;
  data: string[];
  question: string;
  answer: Answer;
};

const schoolBusCase: Case = {
  id: "F1",
  title: "The School Bus",
  brief:
    "Bayangkan ada sebuah bus sekolah dalam keadaan kosong. Seluruh bagian dan interior bus tetap berada di tempatnya.",
  data: [],
  question:
    "Bagaimana cara Anda mengetahui volume ruang kosong di dalam bus tersebut? Jelaskan metode yang akan Anda gunakan dan bagaimana Anda menjalankannya.",
  answer: {
    type: "write",
    placeholder:
      "Tidak ada satu jawaban baku. Jelaskan cara berpikir dan langkah yang akan Anda lakukan…",
  },
};

const tracks: Record<string, { name: string; level: string; cases: Case[] }> = {
  specialist: {
    name: "The Specialist Track",
    level: "Specialist",
    cases: [
      {
        id: "S1",
        title: "Cheap Leads, Expensive Customers",
        brief:
          "Sebuah brand kursus online mencatat CPL Rp38.000, turun 35% dibanding bulan lalu. Sales merasa kualitas lead memburuk, sementara revenue tetap datar. Tim marketing menyebut campaign ini berhasil.",
        data: [
          "Field “company” dihapus dari form untuk menaikkan volume lead.",
          "Waktu respons sales naik dari 8 menit menjadi 34 menit.",
          "CAC dan average transaction value tidak menunjukkan perbaikan.",
          "Channel mix berubah dan duplicate lead rate meningkat.",
          "Sebanyak 28% lead ternyata duplikat dari database lama.",
        ],
        question:
          "Apakah campaign ini berhasil? Pilih diagnosis yang paling tepat.",
        answer: {
          type: "choice",
          options: [
            "Berhasil. CPL turun adalah bukti efisiensi campaign.",
            "Belum bisa disebut berhasil. Audit kualitas lead, duplikasi, dan response time sebelum menilai dari CPL.",
            "Gagal. Hentikan semua campaign sampai revenue naik.",
            "Masalah sepenuhnya ada di sales karena CPL sudah membaik.",
          ],
        },
      },
      {
        id: "S2",
        title: "Meta Ads: The 64% Click Drop",
        brief:
          "Outbound clicks di Meta Ads turun 64% MoM. Pada saat yang sama, messaging conversations naik 95%. Objective campaign berubah dari Traffic menjadi Messaging di pertengahan bulan.",
        data: [
          "Link click, outbound click, dan unique outbound click memiliki definisi berbeda.",
          "Spend turun 18% dan CPM turun 21%.",
          "Meta link clicks hanya turun 15%.",
          "Dashboard masih menggunakan outbound clicks sebagai headline metric.",
        ],
        question:
          "Anda hanya boleh melakukan satu hal sebelum menyentuh campaign. Apa keputusan pertama yang paling dapat dipertanggungjawabkan?",
        answer: {
          type: "choice",
          options: [
            "Kembalikan objective ke Traffic agar perbandingan bulanannya kembali konsisten.",
            "Pertahankan campaign, tetapi gunakan link clicks karena penurunannya paling kecil.",
            "Definisikan ulang primary outcome sesuai objective Messaging, lalu rekonsiliasi metrik sebelum menilai performa.",
            "Pertahankan dashboard dan tunggu satu bulan penuh agar datanya lebih stabil.",
          ],
        },
      },
      {
        id: "S3",
        title: "The Winning Creative Trap",
        brief:
          "Creative A mencatat CTR 6,8%, CPC Rp1.000, dan CPL Rp29.000. Creative B hanya mencatat CTR 2,2%, CPC Rp3.000, dan CPL Rp76.000. Ada tambahan budget Rp50 juta.",
        data: [
          "Lead-to-sale A 2%, sedangkan B 8%.",
          "Cancellation rate A 29%, sedangkan B 6%.",
          "A sudah menghabiskan Rp380 juta; B baru Rp24 juta.",
          "Average order value keduanya relatif sama.",
          "Audiens B lebih sempit dan lebih tua.",
          "Saat budget B dinaikkan 3×, CPL memburuk 42%.",
        ],
        question:
          "Jika tambahan budget harus mulai dialokasikan besok, keputusan mana yang paling kuat?",
        answer: {
          type: "choice",
          options: [
            "Prioritaskan A karena datanya lebih matang; pertahankan CPL sebagai guardrail utama.",
            "Prioritaskan B karena estimasi cost per sale sekitar Rp950.000, tetapi naikkan bertahap dan pantau marginal cost karena sampelnya kecil.",
            "Bagi rata untuk mengurangi risiko salah pilih, lalu gunakan CTR sebagai penentu alokasi berikutnya.",
            "Tahan seluruh budget sampai B memiliki spend yang sama besar dengan A agar perbandingannya adil.",
          ],
        },
      },
      {
        id: "S4",
        title: "Budget Pacing Under Pressure",
        brief:
          "Pada hari ke-18, baru 42% budget terpakai. CPA masih 12% lebih baik dari target. Klien meminta seluruh sisa budget dihabiskan sebelum akhir bulan.",
        data: [
          "Sebagian ad set masih berada dalam learning phase.",
          "Frequency mulai naik pada audiens utama.",
          "Kapasitas sales dan jam operasional terbatas.",
          "Akhir bulan biasanya memiliki pola konversi berbeda.",
          "Kontrak memiliki spend target, tetapi tidak mewajibkan 100% budget habis.",
          "Pada hari ke-24 CPA memburuk 35% dan frequency melonjak.",
        ],
        question:
          "Susun pacing plan sampai akhir bulan, termasuk guardrail dan kondisi kapan Anda harus menahan spend.",
        answer: {
          type: "write",
          placeholder:
            "Jelaskan pembagian budget, guardrail, risiko, dan keputusan Anda jika CPA memburuk…",
        },
      },
      {
        id: "S5",
        title: "Google Ads: Landing Page Drop",
        brief:
          "CTR dan CPC Google Ads membaik, tetapi landing page conversion turun dari 6,5% menjadi 2,8%. Anda perlu menemukan masalah teknisnya sebelum mengubah bidding atau budget.",
        data: [
          "Porsi mobile traffic naik dari 62% menjadi 88%.",
          "Mobile load time memburuk dari 2,9 menjadi 6,8 detik.",
          "Pesan utama iklan tidak muncul di hero landing page.",
          "Search term dan targeting tidak berubah signifikan.",
          "Drop terbesar pada form terjadi di field nomor telepon.",
          "Tidak ada perubahan besar pada attribution setting atau conversion event.",
        ],
        question:
          "Anda punya 72 jam dan hanya satu developer selama empat jam. Apa hipotesis utama, urutan tindakan, dan bukti yang membuat Anda mengubah keputusan?",
        answer: {
          type: "write",
          placeholder:
            "Tuliskan diagnosis dan keputusan Anda. Bedakan fakta, asumsi, serta bukti yang masih perlu dicari…",
        },
      },
      {
        id: "S6",
        title: "Tracking Numbers Do Not Match",
        brief:
          "Ads Manager melaporkan 420 leads, CRM 287, dan spreadsheet sales 251. Setiap tim menganggap angkanya paling benar.",
        data: [
          "Ads menggunakan attribution window 7-day click dan 1-day view.",
          "Webhook sempat gagal selama empat jam.",
          "CRM melakukan deduplication berdasarkan nomor telepon.",
          "Spreadsheet hanya mencatat lead yang berhasil dihubungi.",
          "Sebagian organic WhatsApp dilabel sebagai campaign oleh sales.",
        ],
        question:
          "Tentukan cara rekonsiliasi dan source of truth untuk optimasi media, follow-up sales, dan pelaporan revenue.",
        answer: {
          type: "write",
          placeholder:
            "Pisahkan definisi angka, source of truth, dan footnote untuk laporan akhir…",
        },
      },
      {
        id: "S7",
        title: "Lead Quality Complaint",
        brief:
          "Sales menyebut kualitas lead memburuk setelah ekspansi wilayah. Marketing menunjukkan SQL naik 22% dan CPL turun 14%.",
        data: [
          "Belum ada definisi qualified lead yang disepakati.",
          "Lost reason baru terisi pada 38% lead.",
          "Response time berbeda jauh antar-sales rep.",
          "Kota baru belum memiliki cabang.",
          "SQL naik, tetapi SQL-to-close turun.",
          "Satu sales rep menangani 46% lead dan memiliki response time terburuk.",
        ],
        question:
          "Apa langkah pertama yang paling bernilai sebelum mengubah targeting?",
        answer: {
          type: "choice",
          options: [
            "Kembalikan targeting ke kota lama secepatnya.",
            "Naikkan budget agar jumlah closing menutup penurunan conversion.",
            "Samakan definisi qualified lead, lengkapi lost reason, lalu pecah performa per kota dan sales rep.",
            "Ganti seluruh creative untuk menarik lead yang lebih serius.",
          ],
        },
      },
      {
        id: "S8",
        title: "Seven-Day Recovery Plan",
        brief:
          "Purchase harian sebuah e-commerce turun 40% selama tiga hari tanpa perubahan budget.",
        data: [
          "Purchase tracking event berubah setelah deployment.",
          "Payment gateway menunjukkan peningkatan error.",
          "Kompetitor menjalankan promo besar.",
          "Frequency naik dan creative mulai fatigue.",
          "Dua SKU terlaris hampir habis.",
          "Tracking kemudian terbukti normal; payment failure menjadi penyebab utama.",
        ],
        question:
          "Susun investigasi untuk satu jam pertama, hari pertama, dan tujuh hari. Keputusan apa yang bisa diambil sebelum root cause final?",
        answer: {
          type: "write",
          placeholder:
            "Pisahkan tindakan satu jam, satu hari, dan tujuh hari beserta decision gate-nya…",
        },
      },
      {
        id: "S9",
        title: "The Conversion Rate Trap",
        brief:
          "Conversion rate sebuah landing page naik dari 2,5% menjadi 4,0% setelah tim memasang diskon 25%. Tim menganggap eksperimen ini menang dan ingin menjadikannya always-on.",
        data: [
          "Average order value turun 30%.",
          "Gross margin produk sebelum diskon hanya 42%.",
          "Jumlah transaksi naik 38%.",
          "Refund rate naik dari 3% menjadi 9%.",
          "Repeat purchase cohort diskon lebih rendah dibanding cohort normal.",
        ],
        question:
          "Apakah eksperimen ini benar-benar menang? Buat keputusan dan tunjukkan perhitungan atau metric tree yang Anda gunakan. Data tambahan apa yang paling mungkin membalikkan keputusan Anda?",
        answer: {
          type: "write",
          placeholder:
            "Berikan keputusan, logika ekonomi, dan reversal condition Anda…",
        },
      },
      {
        id: "S10",
        title: "Less Friction, Worse Intent",
        brief:
          "Form lead dipangkas dari enam field menjadi dua field. Form conversion naik hampir dua kali lipat, tetapi sales mengatakan lead baru jauh lebih sulit dikualifikasi.",
        data: [
          "Field jabatan, perusahaan, kebutuhan, dan timeline dihapus.",
          "Cost per lead turun 41%.",
          "Qualified lead rate turun dari 32% menjadi 11%.",
          "Sales response time tidak berubah.",
          "Mayoritas lead baru memilih jawaban paling cepat dan tidak membalas follow-up.",
        ],
        question:
          "Jika hanya satu perubahan boleh diuji minggu depan, mana yang Anda pilih?",
        answer: {
          type: "choice",
          options: [
            "Pertahankan dua field dan tambahkan enrichment otomatis setelah lead masuk.",
            "Kembalikan keenam field karena friction diperlukan untuk menyaring intent.",
            "Tambahkan satu atau dua pertanyaan high-signal secara bertahap dan nilai cost per qualified lead.",
            "Pertahankan form, tetapi ubah follow-up agar sales mengumpulkan seluruh informasi yang hilang.",
          ],
        },
      },
      {
        id: "S11",
        title: "Urgency Without Trust",
        brief:
          "Creative dengan countdown “berakhir 10 menit lagi” menghasilkan CTR dan add-to-cart tertinggi. Countdown tersebut kembali ke 10 menit setiap kali halaman dibuka.",
        data: [
          "Purchase conversion tidak meningkat.",
          "Checkout abandonment naik 18%.",
          "Komentar iklan mulai mempertanyakan keaslian promo.",
          "Refund dan complaint naik pada cohort creative tersebut.",
          "Creative berbasis customer proof memiliki CTR lebih rendah tetapi purchase rate lebih tinggi.",
        ],
        question:
          "Apakah creative ini layak dipertahankan? Jelaskan mekanisme psikologis yang bekerja, kerusakan yang mungkin terjadi, dan eksperimen penggantinya.",
        answer: {
          type: "write",
          placeholder:
            "Pisahkan attention, persuasion, trust, dan business outcome dalam jawaban Anda…",
        },
      },
    ],
  },
  manager: {
    name: "The Manager Track",
    level: "Manager",
    cases: [
      {
        id: "M1",
        title: "The Funnel That Looks Better",
        brief:
          "Leads turun 30%, SQL naik 12%, dan sales naik 25%. Head of Sales mengklaim kenaikan sepenuhnya berasal dari perbaikan timnya.",
        data: [
          "Qualification form diperketat.",
          "Sales cycle rata-rata 45 hari.",
          "Sebagian besar deal berasal dari lead periode sebelumnya.",
          "Spend turun 18%.",
          "Average order value naik 10%.",
          "Dari 120 deal, hanya 43 berasal dari lead periode berjalan.",
        ],
        question:
          "Kesimpulan mana yang paling dapat dipertanggungjawabkan?",
        answer: {
          type: "choice",
          options: [
            "Sales benar karena deal naik 25%.",
            "Marketing benar karena SQL naik walau lead turun.",
            "Belum bisa mengklaim kontribusi tunggal; pisahkan cohort lead dan revenue berdasarkan periode asal.",
            "Kedua tim gagal karena volume lead turun.",
          ],
        },
      },
      {
        id: "M2",
        title: "Budget Allocation Across Branches",
        brief:
          "Lima cabang memiliki CPL, show rate, close rate, kapasitas, dan potensi pasar yang berbeda. CEO meminta budget dibagi rata demi keadilan.",
        data: [
          "Cabang A memiliki CPL murah tetapi show rate rendah.",
          "Cabang B memiliki CPL mahal, close rate dan AOV tertinggi.",
          "Cabang C hampir penuh.",
          "Cabang D masih baru dengan awareness rendah.",
          "Cabang E memiliki response time terbaik tetapi pasar kecil.",
          "Cabang B meminta budget tambahan, namun hanya 12% slot tersisa.",
        ],
        question:
          "CEO memberi Anda 100 unit budget untuk bulan depan. Buat alokasi awal ke lima cabang, nyatakan asumsi yang Anda gunakan, dan tentukan trigger untuk memindahkan budget.",
        answer: {
          type: "write",
          placeholder:
            "Berikan angka alokasi dan alasan di balik setiap keputusan…",
        },
      },
      {
        id: "M3",
        title: "Sales–Marketing Definition War",
        brief:
          "Marketing melaporkan 1.400 MQL, sedangkan sales hanya menerima 310. Kedua tim saling menyalahkan.",
        data: [
          "Tidak ada definisi stage yang seragam.",
          "Sebanyak 22% record CRM tidak memiliki source.",
          "Sales dapat mengubah status tanpa reason.",
          "Marketing mengoptimalkan form submission.",
          "Insentif sales hanya berdasarkan closed revenue.",
          "Sales menolak SLA karena volume dianggap terlalu tinggi.",
        ],
        question:
          "Besok pagi Anda memimpin pertemuan kedua tim. Keputusan apa yang harus selesai dalam rapat itu, apa yang Anda ubah selama 30 hari, dan bagaimana Anda membuktikan sumber masalah tanpa memihak salah satu tim?",
        answer: {
          type: "write",
          placeholder:
            "Tuliskan keputusan, cara implementasi, dan evidence yang akan Anda gunakan…",
        },
      },
      {
        id: "M4",
        title: "Experiment Portfolio",
        brief:
          "Ada 14 ide eksperimen, budget terbatas, dan hanya dua slot developer. Semua stakeholder menganggap idenya prioritas.",
        data: [
          "Ide tersebar di acquisition, conversion, dan retention.",
          "Beberapa ide tidak memiliki baseline yang valid.",
          "Eksperimen berpotensi tinggi membutuhkan enam minggu.",
          "Ada quick win dengan dampak kecil tetapi kepastian tinggi.",
          "CEO menginginkan revenue signal dalam 30 hari.",
          "Eksperimen terbesar gagal pada minggu kedua.",
        ],
        question:
          "Dua slot mana yang seharusnya dipilih?",
        answer: {
          type: "choice",
          options: [
            "Dua eksperimen dengan projected revenue terbesar, meskipun baseline-nya belum lengkap.",
            "Dua quick wins dengan confidence tertinggi agar revenue signal 30 hari lebih terjamin.",
            "Satu quick-signal test dan satu high-upside test, masing-masing dengan baseline, learning goal, dan kill criteria.",
            "Satu permintaan CEO dan satu ide dari tim, agar dukungan stakeholder tetap terjaga.",
          ],
        },
      },
      {
        id: "M5",
        title: "Scale Meets Capacity",
        brief:
          "CAC sangat profitable dan founder ingin menaikkan spend 8× bulan depan.",
        data: [
          "Sales sudah 86% utilized.",
          "Onboarding membutuhkan konsultasi manusia.",
          "Response time memburuk pada jam sibuk.",
          "Frequency mulai naik.",
          "Cash baru terkumpul 30–45 hari setelah penjualan.",
          "Saat spend naik 2×, leads hanya naik 1,6× dan CAC memburuk 24%.",
        ],
        question:
          "Keputusan scale mana yang paling bertanggung jawab?",
        answer: {
          type: "choice",
          options: [
            "Naikkan 8× karena CAC saat ini masih profitable.",
            "Tolak scale sampai semua tim memiliki kapasitas berlebih.",
            "Scale bertahap berdasarkan kapasitas funnel, cash cycle, response time, dan marginal CAC.",
            "Alihkan seluruh proses onboarding ke automation minggu ini.",
          ],
        },
      },
      {
        id: "M6",
        title: "Reporting After Objective Change",
        brief:
          "Weekly clicks dan landing page views turun, sementara messages dan qualified consultations naik. Klien menuduh agency gagal.",
        data: [
          "Objective berubah dari Landing Page Views menjadi Messages di tengah periode.",
          "Taxonomy report belum diperbarui.",
          "Dashboard masih membandingkan metrik lama.",
          "Qualified consultation dicatat manual.",
          "Revenue belum tersedia.",
          "Klien tetap meminta satu headline: naik atau turun.",
        ],
        question:
          "Perbaiki struktur report, narasi, dan quality assurance-nya. Apa satu headline yang Anda sampaikan?",
        answer: {
          type: "write",
          placeholder:
            "Tulis headline, konteks perubahan objective, metrik utama, caveat, dan langkah QA…",
        },
      },
      {
        id: "M7",
        title: "The Prestigious Client",
        brief:
          "Sebuah agency memiliki klien Rp40 juta per bulan dengan logo terkenal. Direct cost terlihat rendah, tetapi perhatian senior sangat tinggi dan pembayaran baru masuk pada hari ke-67.",
        data: [
          "Creative Director menghabiskan 42% kapasitas untuk klien ini.",
          "Founder rutin masuk meeting.",
          "Output aktual dua kali lipat scope.",
          "Logo tersebut belum menghasilkan closed deal baru.",
          "Ada peluang klien Rp70 juta yang membutuhkan Creative Director sama.",
          "Klien lama bersedia membayar Rp52 juta, tetapi meminta SLA lebih cepat.",
        ],
        question:
          "Keputusan awal mana yang paling kuat?",
        answer: {
          type: "choice",
          options: [
            "Pertahankan karena logo terkenal pasti bernilai.",
            "Langsung exit agar kapasitas tersedia.",
            "Reprice dan redesign scope/SLA berdasarkan full cost serta opportunity cost sebelum memutuskan.",
            "Terima Rp52 juta dengan semua permintaan SLA.",
          ],
        },
      },
      {
        id: "M8",
        title: "Thirty-Day Turnaround",
        brief:
          "Sebuah business unit kehilangan 35% qualified leads. Morale sales turun dan CEO menuntut pemulihan dalam 30 hari dengan budget tetap.",
        data: [
          "Traffic hanya turun 8%.",
          "Form conversion turun setelah perubahan website.",
          "Sales response time memburuk.",
          "Creative mengalami fatigue.",
          "Satu cabang sudah mencapai kapasitas.",
          "Pada hari ke-10 qualified leads pulih, tetapi sales masih datar.",
        ],
        question:
          "Apa tiga keputusan pertama Anda dalam 72 jam? Setelah qualified leads pulih pada hari ke-10 tetapi sales tetap datar, apa yang Anda hentikan, lanjutkan, dan ubah?",
        answer: {
          type: "write",
          placeholder:
            "Jelaskan urutan keputusan sebelum dan sesudah informasi hari ke-10…",
        },
      },
    ],
  },
  head: {
    name: "The Head & VP Track",
    level: "Head & VP",
    cases: [
      {
        id: "H1",
        title: "The Expensive Lead Board Problem",
        brief:
          "CPL naik dari Rp48.000 menjadi Rp137.000 dalam 18 bulan. CEO meminta CPL dipotong 50% dalam 60 hari. Monthly media budget mencapai Rp750 juta.",
        data: [
          "Downstream conversion membaik.",
          "Average contract value naik, tetapi financing cost dan commission ikut naik.",
          "Sales hampir penuh dan response time memburuk.",
          "Definisi lead berubah menjadi gabungan form dan messaging.",
          "Sebagian sales berasal dari returning prospects.",
          "Incrementality belum bersih; CEO ingin CPL dijadikan KPI bonus.",
        ],
        question:
          "Tulis respons maksimal 150 kata kepada CEO. Putuskan apakah target CPL -50% diterima, ditolak, atau diubah—serta tunjukkan dasar keputusan Anda.",
        answer: {
          type: "write",
          placeholder:
            "Berikan keputusan yang bisa dibawa ke board, bukan daftar metric…",
        },
      },
      {
        id: "H2",
        title: "Revenue Growth or Getting Bigger?",
        brief:
          "Revenue agency tumbuh dari Rp3,8 miliar menjadi Rp9,4 miliar dalam dua tahun. Founder ingin mempercepat pertumbuhan dan mulai berbicara dengan investor.",
        data: [
          "Gross margin turun dari 48% menjadi 28%.",
          "Lima klien menyumbang 60% revenue.",
          "Receivable mencapai 57 hari.",
          "Founder menjadi bottleneck keputusan.",
          "Kas hanya setara 1,8 bulan payroll.",
          "Pengeluaran pribadi founder masih bercampur dengan perusahaan.",
        ],
        question:
          "Apakah Anda menyarankan founder mulai fundraising sekarang? Berikan keputusan, diagnosis kualitas pertumbuhan, dan tiga intervensi 90 hari yang paling menentukan.",
        answer: {
          type: "write",
          placeholder:
            "Tulis rekomendasi Anda kepada founder dan trade-off yang menyertainya…",
        },
      },
      {
        id: "H3",
        title: "The Impossible Revenue Target",
        brief:
          "Board meminta revenue naik 40% dengan EBITDA margin tetap, tanpa headcount tambahan, dan budget iklan hanya naik 10%. Revenue saat ini Rp60 miliar.",
        data: [
          "Lima dari 20 kategori menyumbang mayoritas revenue.",
          "Sebagian business unit penuh, sebagian masih underutilized.",
          "Price elasticity belum pernah diuji.",
          "Retention sangat berbeda antar-segmen.",
          "Pipeline menutup sebagian target, tetapi sales cycle panjang.",
          "Board meminta satu pilihan investasi utama.",
        ],
        question:
          "Sebelum menyetujui target ini, lima hal apa yang Anda cari tahu terlebih dahulu? Setelah itu, pilih satu growth bet sementara dan jelaskan mengapa Anda belum memilih alternatif lainnya.",
        answer: {
          type: "write",
          placeholder:
            "Tunjukkan informasi yang Anda prioritaskan, hipotesis, dan tingkat keyakinan Anda…",
        },
      },
      {
        id: "H4",
        title: "Resonance Is Not the Constraint",
        brief:
          "Sebuah luxury fitness brand memiliki NPS, repeat rate, engagement, dan trial conversion yang tinggi, tetapi revenue datar selama 18 bulan. Konsultan meminta riset psikografis lebih dalam.",
        data: [
          "Flagship gym terisi 94% saat peak, tetapi 43% saat off-peak.",
          "Sebanyak 90% acquisition berasal dari radius tujuh kilometer.",
          "Price elasticity belum diuji.",
          "Corporate partnership masih sangat sedikit.",
          "Sebanyak 70% budget menargetkan audiens yang sama.",
          "Lokasi baru membutuhkan capex dengan payback 14 bulan.",
        ],
        question:
          "Jika hanya satu keputusan dapat dijalankan kuartal ini, mana yang Anda pilih?",
        answer: {
          type: "choice",
          options: [
            "Uji pricing lebih dulu karena utilisasi peak menunjukkan willingness to pay yang belum dimaksimalkan.",
            "Bangun demand off-peak melalui product/partnership baru sebelum menambah kapasitas.",
            "Mulai lokasi baru karena flagship hampir penuh saat peak dan payback hanya 14 bulan.",
            "Perluas acquisition di luar radius tujuh kilometer untuk mengurangi ketergantungan pasar lokal.",
          ],
        },
      },
      {
        id: "H5",
        title: "High-Ticket Demand Without Search Volume",
        brief:
          "Perusahaan teknologi pelabuhan menjual solusi industri seharga Rp8 miliar per unit. Search volume rendah, sales cycle 6–18 bulan, dan buying committee terdiri dari 7–10 orang. CEO ingin 100 Meta leads per bulan.",
        data: [
          "TAM terbatas dan banyak buyer berasal dari pemerintah.",
          "Technical approval dan site assessment wajib.",
          "Network dan procurement lebih menentukan dari form leads.",
          "Satu deal dapat menutup annual marketing cost.",
          "Case study dan credibility asset masih sedikit.",
        ],
        question:
          "Arah demand generation mana yang paling tepat?",
        answer: {
          type: "choice",
          options: [
            "Kejar 100 Meta leads agar pipeline terisi.",
            "Bangun account-based demand system: target account, buying committee, credibility asset, dan stage-based leading indicators.",
            "Fokus SEO sampai search volume terbentuk.",
            "Hentikan marketing dan serahkan seluruhnya ke sales.",
          ],
        },
      },
      {
        id: "H6",
        title: "Build the AI Reporting System?",
        brief:
          "Sebuah agency menghabiskan 160 jam per bulan untuk reporting. CEO ingin membangun AI agar tidak perlu menambah headcount.",
        data: [
          "60 jam dipakai untuk export dan normalisasi data.",
          "25 jam habis mengejar tracking yang hilang.",
          "35 jam digunakan untuk analisis.",
          "40 jam digunakan untuk deck dan quality assurance.",
          "Taxonomy dan attribution belum konsisten; sebuah error pernah nyaris memicu eskalasi.",
          "SaaS seharga Rp15 juta per bulan dapat menghemat 70 jam.",
        ],
        question:
          "Keputusan mana yang paling masuk akal?",
        answer: {
          type: "choice",
          options: [
            "Bangun AI end-to-end segera agar semua 160 jam hilang.",
            "Beli SaaS langsung dan hapus seluruh proses QA.",
            "Redesign data contract dan taxonomy, otomasi pekerjaan deterministik, lalu buy/build berdasarkan business case dan checkpoint QA.",
            "Tambah headcount karena automation terlalu berisiko.",
          ],
        },
      },
      {
        id: "H7",
        title: "Organization Design Under Growth",
        brief:
          "Tim memiliki fungsi performance, content, social, design, CRM, dan web. Target revenue naik 50%, tetapi tidak ada headcount tambahan selama enam bulan.",
        data: [
          "Ownership banyak yang tumpang tindih.",
          "Founder menjadi approval bottleneck.",
          "Reporting menyita waktu senior.",
          "Volume content tinggi dengan reuse rendah.",
          "Handoff masih manual.",
          "Owner dan KPI tidak jelas; CEO ingin semua inisiatif tetap berjalan.",
        ],
        question:
          "Target tidak boleh diturunkan dan headcount tidak bertambah. Dua perubahan organisasi apa yang Anda lakukan terlebih dahulu, keputusan apa yang dipindahkan dari founder, dan pekerjaan apa yang sengaja dihentikan?",
        answer: {
          type: "write",
          placeholder:
            "Pilih perubahan paling berdampak dan jelaskan konsekuensinya…",
        },
      },
      {
        id: "H8",
        title: "Zero-Budget Revenue Recovery",
        brief:
          "Sebuah consulting firm kehilangan klien terbesar. Runway tersisa 11 minggu. Mereka memiliki 150 mantan klien, 11.000 koneksi LinkedIn, dua case study kuat, empat karyawan, dan nol budget paid media. Targetnya Rp500 juta contracted revenue dalam 90 hari.",
        data: [
          "Kualitas hubungan dengan mantan klien bervariasi.",
          "Kapasitas delivery terbatas.",
          "Founder kredibel tetapi tidak konsisten melakukan outbound.",
          "Offer terlalu luas.",
          "Deal besar berpotensi memiliki pembayaran hari ke-60.",
          "Pada minggu ketiga, deal Rp75 juta akan memakai 50% kapasitas selama dua bulan.",
        ],
        question:
          "Susun strategi 90 hari, agenda Senin 08.00–18.00, weekly cadence, offer, pipeline math, dan acceptance rule.",
        answer: {
          type: "write",
          placeholder:
            "Buat rencana operasional konkret dari hari pertama sampai hari ke-90…",
        },
      },
    ],
  },
};

export async function GET(request: NextRequest) {
  const trackKey = request.nextUrl.searchParams.get("track") ?? "specialist";
  const track = tracks[trackKey];

  if (!track) {
    return NextResponse.json({ error: "Jalur tidak ditemukan." }, { status: 404 });
  }

  const selectedCaseIds: Record<string, string[]> = {
    specialist: ["S2", "S3", "S5", "S9", "S10", "S11"],
    manager: ["M2", "M3", "M4", "M8"],
    head: ["H1", "H2", "H3", "H4", "H7"],
  };
  const roleCases = track.cases.filter((item) =>
    selectedCaseIds[trackKey].includes(item.id),
  );
  const cases = [...roleCases, schoolBusCase];
  const rawIndex = Number(request.nextUrl.searchParams.get("index") ?? "0");
  const index = Number.isInteger(rawIndex)
    ? Math.min(Math.max(rawIndex, 0), cases.length - 1)
    : 0;

  return NextResponse.json({
    track: { id: trackKey, name: track.name, level: track.level },
    case: cases[index],
    index,
    total: cases.length,
  });
}
