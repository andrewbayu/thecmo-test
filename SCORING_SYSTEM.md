# The CMO Test — Scoring System

Versi rubric: `2026.07-v4`

## Prinsip

Scoring mengukur kualitas keputusan, bukan panjang jawaban atau kemiripan kata
dengan benchmark. Kandidat tidak melihat rubric, jawaban ideal, atau skor selama
assessment. Setiap nilai harus dapat ditelusuri ke evidence dalam jawaban.

## Struktur skor

Operating Index menggunakan skala 0–100:

- 80% Role Score: kemampuan yang relevan dengan level yang dipilih.
- 20% The School Bus: raw problem solving yang dibandingkan lintas level.

Jumlah pertanyaan tidak mengubah kontribusi dua komponen tersebut. Role Score
merupakan agregasi evidence dari seluruh role cases, kemudian dibobotkan menurut
level.

## Skala 0–4

| Skor | Interpretasi |
|---|---|
| 0 | Miss — tidak memahami inti masalah atau keputusan tidak relevan. |
| 1 | Surface — menangkap gejala, tetapi reasoning masih dangkal. |
| 2 | Analytical — menggunakan data dengan benar dan menemukan sebagian causal chain. |
| 3 | Strategic — memahami trade-off, threshold, dan downstream implication. |
| 4 | Operator — diagnosis, keputusan, eksekusi, asumsi, dan feedback loop terintegrasi. |

Pilihan ganda memiliki score map 0–4 per opsi. Jawaban tertulis dinilai per
dimension menggunakan anchor di atas. Jawaban generik tidak otomatis mendapat
nilai tinggi.

Pertanyaan terbuka dinilai dari keputusan dan jejak reasoning yang terlihat:
kandidat harus membedakan fakta, asumsi, dan hipotesis; memilih prioritas;
menjelaskan trade-off; serta menyebutkan bukti yang dapat mengubah keputusannya.
Penggunaan istilah yang terdengar strategis tanpa hubungan sebab-akibat tidak
dianggap evidence.

Opsi pilihan ganda sengaja dibuat sama-sama masuk akal. Nilai penuh hanya
diberikan pada opsi dengan framing dan trade-off paling kuat; opsi lain dapat
memperoleh nilai parsial jika tetap defensible.

## Bobot dimension per level

| Dimension | Specialist | Manager | Head & VP |
|---|---:|---:|---:|
| Information Selection | 15% | 15% | 15% |
| Metric / Data Accuracy | 20% | 10% | 5% |
| Problem Framing | 15% | 15% | 15% |
| Technical / Execution Judgment | 20% | 10% | 5% |
| Commercial Judgment | 10% | 15% | 20% |
| Prioritization & Resource Allocation | 10% | 15% | 15% |
| Systems / Cross-Functional Thinking | 5% | 15% | 15% |
| Belief Updating | 5% | 10% | 10% |

Specialist sengaja memberi bobot terbesar pada metric accuracy dan technical
execution. Leadership memberi bobot terbesar pada commercial judgment,
prioritization, dan systems thinking.

## The School Bus

| Dimension | Bobot |
|---|---:|
| Problem Reframing | 25% |
| Originality | 25% |
| Practicality | 25% |
| Execution Clarity | 15% |
| Critical Awareness | 10% |

The School Bus adalah tes creative problem solving, bukan tes engineering atau
akurasi estimasi. Tidak ada satu jawaban baku. Reviewer menilai apakah kandidat
dapat mengubah bentuk masalah, menemukan metode yang tidak obvious, dan tetap
menjelaskan cara eksekusinya secara masuk akal.

Metode manual seperti mengukur setiap bidang dengan penggaris dapat menghasilkan
angka, tetapi mendapat sinyal rendah jika lambat, kompleks, atau tidak practical.
Sebaliknya, pendekatan transformasional—misalnya menjadikan kabin sebagai wadah
ukur—mendapat sinyal tinggi apabila kandidat menjelaskan prasyarat seperti
sealing, proses pengisian, air pocket, cara mengukur material yang masuk, risiko,
dan mitigasinya. Contoh tersebut bukan jawaban wajib maupun satu-satunya jawaban
yang dapat memperoleh skor tinggi.

## Classification

| Operating Index | Classification |
|---:|---|
| <40 | Below Role Readiness |
| 40–54 | Developing |
| 55–69 | Role-Capable with Supervision |
| 70–79 | Ready |
| 80–87 | Strong |
| 88–93 | Senior / Next-Level Signal |
| 94+ | Exceptional / Cross-Level Operator |

Rekomendasi hiring internal:

- 88+: Strong Advance
- 80–87: Advance
- 70–79: Review / Hold
- <70: Do Not Advance

Threshold 88 digunakan sebagai standar ketat The CMO Test. Persentase kelulusan
historis 0,7% tetap harus divalidasi terhadap cohort baru; angka tersebut tidak
digunakan untuk memaksa distribusi skor.

## Critical misses

Critical miss adalah kesalahan yang membuat kandidat belum aman menjalankan
role, misalnya mengambil keputusan sebelum memvalidasi constraint utama,
mengabaikan capacity/cash risk, atau menawarkan metode yang melanggar batas
kasus.

Satu unresolved critical miss membatasi hasil akhir maksimum di 69. Reviewer
dapat menyelesaikan flag hanya jika ada evidence lain yang secara eksplisit
mengoreksi kesalahan tersebut.

## Evaluation flow

1. Saat jalur selesai, seluruh jawaban disimpan sebagai satu submission dengan
   reference ID dan rubric version.
2. Pilihan ganda dinilai otomatis dengan score map yang tersimpan server-side.
3. Reviewer menandai evidence pada jawaban tertulis dan memberi skor 0–4 per
   dimension yang applicable.
4. Calibrator memeriksa critical miss, konsistensi antar-case, dan confidence.
5. Sistem menghitung Role Score, School Bus Score, dan Operating Index.
6. Manual override diperbolehkan, tetapi wajib memiliki reason code dan
   identitas reviewer.

Rubric, score map, dan benchmark tidak boleh dikirim ke browser kandidat.
