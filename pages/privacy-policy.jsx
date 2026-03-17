import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
    {
        title: '1. Informasi yang Kami Kumpulkan',
        content: [
            'Saat Anda memesan undangan digital melalui SInvitation, kami mengumpulkan informasi yang diperlukan untuk memproses pesanan Anda, termasuk:',
            '• Nama lengkap mempelai/pemesan',
            '• Nomor telepon dan/atau WhatsApp',
            '• Informasi acara (tanggal, waktu, lokasi)',
            '• Foto-foto yang Anda kirimkan untuk undangan',
            '• Data tamu undangan (nama tamu)',
            'Kami hanya mengumpulkan informasi yang benar-benar diperlukan untuk menyediakan layanan undangan digital kepada Anda.',
        ],
    },
    {
        title: '2. Penggunaan Informasi',
        content: [
            'Informasi yang kami kumpulkan digunakan untuk:',
            '• Memproses dan membuat undangan digital sesuai pesanan Anda',
            '• Menampilkan nama tamu pada link undangan personal',
            '• Mengelola fitur RSVP dan buku tamu',
            '• Berkomunikasi dengan Anda terkait pesanan (melalui WhatsApp)',
            '• Meningkatkan kualitas layanan kami',
            'Kami tidak akan menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran.',
        ],
    },
    {
        title: '3. Penyimpanan Data',
        content: [
            'Data pesanan dan undangan digital Anda disimpan di server yang aman selama masa aktif undangan berlaku.',
            'Foto-foto yang Anda kirimkan hanya digunakan untuk keperluan undangan digital dan tidak akan digunakan untuk tujuan lain tanpa izin Anda.',
            'Jika masa aktif undangan berakhir atau Anda meminta penghapusan, kami akan menghapus data Anda dalam waktu yang wajar.',
        ],
    },
    {
        title: '4. Keamanan Data',
        content: [
            'Kami berkomitmen untuk melindungi informasi pribadi Anda. Langkah-langkah keamanan yang kami terapkan meliputi:',
            '• Enkripsi data saat transmisi (HTTPS)',
            '• Akses terbatas ke data pribadi oleh tim yang berwenang',
            '• Pembaruan keamanan berkala pada sistem kami',
            'Meskipun demikian, tidak ada metode transmisi data melalui internet yang 100% aman. Kami akan berusaha semaksimal mungkin untuk melindungi data Anda.',
        ],
    },
    {
        title: '5. Cookies',
        content: [
            'Website SInvitation dapat menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies adalah file kecil yang disimpan di perangkat Anda.',
            'Kami menggunakan cookies untuk:',
            '• Mengingat preferensi bahasa Anda',
            '• Menganalisis traffic website (melalui Google Analytics)',
            '• Meningkatkan kinerja website',
            'Anda dapat mengatur browser Anda untuk menolak cookies, namun beberapa fitur website mungkin tidak berfungsi optimal.',
        ],
    },
    {
        title: '6. Hak Anda',
        content: [
            'Anda memiliki hak untuk:',
            '• Mengakses data pribadi Anda yang kami simpan',
            '• Meminta koreksi data yang tidak akurat',
            '• Meminta penghapusan data pribadi Anda',
            '• Menolak penggunaan data untuk tujuan tertentu',
            'Untuk menggunakan hak-hak tersebut, silakan hubungi kami melalui WhatsApp.',
        ],
    },
    {
        title: '7. Perubahan Kebijakan Privasi',
        content: [
            'Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan terbaru.',
            'Kami menyarankan Anda untuk memeriksa halaman ini secara berkala untuk mengetahui perubahan.',
        ],
    },
    {
        title: '8. Hubungi Kami',
        content: [
            'Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:',
            '• WhatsApp: +62 831 1599 8178',
            '• Instagram: @sinvitation.my.id',
            '• Lokasi: Gianyar, Bali, Indonesia',
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Kebijakan Privasi | SInvitation</title>
                <meta name="description" content="Kebijakan Privasi SInvitation — Informasi tentang bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda." />
                <link rel="canonical" href="https://sinvitation.my.id/privacy-policy" />
                <meta property="og:title" content="Kebijakan Privasi | SInvitation" />
                <meta property="og:url" content="https://sinvitation.my.id/privacy-policy" />
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
                            <Shield className="w-7 h-7 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-elegant-dark mb-4">
                            Kebijakan Privasi
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
                            <strong className="text-elegant-dark">SInvitation</strong> menghargai privasi Anda. 
                            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, 
                            dan melindungi informasi pribadi Anda saat menggunakan layanan undangan digital kami 
                            di <strong className="text-elegant-dark">sinvitation.my.id</strong>.
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
