import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
    {
        title: '1. Ketentuan Umum',
        content: [
            'Dengan mengakses dan menggunakan website sinvitation.my.id serta layanan yang kami sediakan, Anda dianggap telah membaca, memahami, dan menyetujui Syarat dan Ketentuan ini.',
            'SInvitation berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Perubahan akan berlaku sejak dipublikasikan di halaman ini.',
        ],
    },
    {
        title: '2. Layanan Kami',
        content: [
            'SInvitation menyediakan layanan pembuatan undangan digital berbasis website, yang meliputi:',
            '• Undangan pernikahan digital',
            '• Undangan ulang tahun digital',
            '• Undangan upacara metatah (potong gigi) digital',
            '• Filter Instagram premium',
            '• Fitur RSVP dan buku tamu',
            '• Fitur amplop digital',
            'Layanan ini diberikan sesuai dengan paket yang dipilih oleh klien dan data yang dikirimkan.',
        ],
    },
    {
        title: '3. Proses Pemesanan',
        content: [
            'Proses pemesanan undangan digital di SInvitation adalah sebagai berikut:',
            '• Klien memilih paket undangan yang diinginkan',
            '• Klien mengisi form data yang diperlukan (nama mempelai, tanggal acara, lokasi, foto, dll)',
            '• Klien melakukan pembayaran sesuai harga paket yang dipilih',
            '• Tim SInvitation memproses pesanan dalam waktu 1-3 hari kerja',
            '• Klien menerima link undangan digital yang sudah jadi',
            '• Klien dapat meminta revisi jika diperlukan',
        ],
    },
    {
        title: '4. Pembayaran',
        content: [
            'Pembayaran dilakukan di muka (full payment) sebelum proses pengerjaan dimulai.',
            'Metode pembayaran yang tersedia akan diinformasikan melalui WhatsApp saat proses pemesanan.',
            'Harga yang tercantum di website dapat berubah sewaktu-waktu. Harga yang berlaku adalah harga pada saat pemesanan dikonfirmasi.',
        ],
    },
    {
        title: '5. Revisi',
        content: [
            'SInvitation menyediakan layanan revisi untuk memastikan undangan digital Anda sesuai dengan keinginan:',
            '• Paket Basic: Revisi hingga undangan fix',
            '• Paket Signature: Revisi sepuasnya',
            'Revisi mencakup perubahan teks, foto, tanggal, waktu, lokasi, dan elemen lain yang tersedia dalam template.',
            'Revisi yang mengubah keseluruhan template atau desain di luar template yang dipilih akan dikenakan biaya tambahan.',
        ],
    },
    {
        title: '6. Masa Aktif Undangan',
        content: [
            'Setiap undangan digital memiliki masa aktif sesuai dengan paket yang dipilih:',
            '• Paket Basic: Masa aktif 1 tahun sejak undangan dipublikasikan',
            '• Paket Signature: Masa aktif seumur hidup (permanen)',
            'Setelah masa aktif berakhir, undangan tidak akan dapat diakses melalui link yang diberikan, kecuali klien memperpanjang masa aktif.',
        ],
    },
    {
        title: '7. Hak Kekayaan Intelektual',
        content: [
            'Semua desain template, kode program, dan konten website SInvitation adalah milik SInvitation dan dilindungi oleh hak cipta.',
            'Klien memiliki hak untuk menggunakan undangan digital yang telah dipesannya untuk keperluan pribadi.',
            'Klien tidak diperkenankan untuk menyalin, mendistribusikan, atau menjual kembali template atau desain undangan digital SInvitation.',
        ],
    },
    {
        title: '8. Pembatalan dan Pengembalian Dana',
        content: [
            'Pembatalan pesanan hanya dapat dilakukan sebelum proses pengerjaan dimulai, dengan pengembalian dana sebesar 100%.',
            'Jika proses pengerjaan sudah dimulai, pembatalan dapat dilakukan dengan pengembalian dana sebesar 50%.',
            'Setelah undangan digital selesai dan link sudah dikirimkan, tidak ada pengembalian dana.',
        ],
    },
    {
        title: '9. Batasan Tanggung Jawab',
        content: [
            'SInvitation tidak bertanggung jawab atas:',
            '• Kesalahan data yang diberikan oleh klien',
            '• Gangguan akses website yang disebabkan oleh faktor di luar kendali kami (server hosting, internet, dll)',
            '• Penyalahgunaan link undangan oleh pihak ketiga',
            'Kami akan berusaha semaksimal mungkin untuk memberikan layanan terbaik dan mengatasi masalah teknis secepat mungkin.',
        ],
    },
    {
        title: '10. Hubungi Kami',
        content: [
            'Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:',
            '• WhatsApp: +62 831 1599 8178',
            '• Instagram: @sinvitation.my.id',
            '• Lokasi: Gianyar, Bali, Indonesia',
        ],
    },
];

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Syarat dan Ketentuan | SInvitation</title>
                <meta name="description" content="Syarat dan Ketentuan layanan SInvitation — Ketentuan penggunaan layanan undangan digital premium." />
                <link rel="canonical" href="https://sinvitation.my.id/terms-of-service" />
                <meta property="og:title" content="Syarat dan Ketentuan | SInvitation" />
                <meta property="og:url" content="https://sinvitation.my.id/terms-of-service" />
            </Head>

            <Navbar />

            <main className="pt-36 pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-soft-blue rounded-2xl mb-6">
                            <FileText className="w-7 h-7 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-elegant-dark mb-4">
                            Syarat dan Ketentuan
                        </h1>
                        <p className="text-gray-500 text-lg">
                            Terakhir diperbarui: 18 Maret 2026
                        </p>
                    </motion.div>

                    {/* Intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-soft-blue/50 border border-blue-100 rounded-2xl p-6 mb-12"
                    >
                        <p className="text-gray-700 leading-relaxed">
                            Selamat datang di <strong className="text-elegant-dark">SInvitation</strong>. Halaman ini 
                            memuat Syarat dan Ketentuan yang mengatur penggunaan layanan undangan digital kami. 
                            Harap membaca dengan seksama sebelum menggunakan layanan kami.
                        </p>
                    </motion.div>

                    {/* Sections */}
                    <div className="space-y-10">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 }}
                            >
                                <h2 className="text-xl font-bold text-elegant-dark mb-4">
                                    {section.title}
                                </h2>
                                <div className="space-y-3">
                                    {section.content.map((paragraph, pIdx) => (
                                        <p key={pIdx} className={`text-gray-600 leading-relaxed ${paragraph.startsWith('•') ? 'pl-4' : ''}`}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Back Link */}
                    <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                        <Link href="/" className="text-primary font-bold hover:underline underline-offset-4">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
