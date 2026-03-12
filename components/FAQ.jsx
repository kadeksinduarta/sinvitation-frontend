import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "Berapa lama proses pembuatan undangan digital?",
        answer: "Proses pembuatan undangan digital di Sinvitation memakan waktu sekitar 1 hingga 3 hari kerja, tergantung pada antrean dan kelengkapan data yang Anda kirimkan. Setelah desain awal selesai, Anda dapat langsung melihat hasilnya secara online."
    },
    {
        question: "Apakah bisa revisi jika ada data yang salah atau berubah karena ganti hari?",
        answer: "Tentu! Kami menyediakan layanan revisi sepuasnya sampai undangan Anda fix dan siap sebar. Anda bebas mengubah teks, menambahkan foto, hingga mengganti tanggal atau lagu latar."
    },
    {
        question: "Bagaimana cara pengisian nama tamu pada undangan?",
        answer: "Sangat mudah! Kami akan memberikan tutorial khusus dan link otomatis. Anda hanya perlu mengetikkan nama tamu, lalu sistem kami akan membuatkan pesan WhatsApp lengkap dengan link undangan yang sudah menyertakan nama tamu tersebut secara otomatis."
    },
    {
        question: "Apakah saya bisa melihat siapa saja yang akan hadir?",
        answer: "Ya, kami menyediakan fitur Buku Tamu / RSVP. Nanti Anda akan mendapatkan satu link khusus ke Dashboard Kehadiran, untuk memantau tamu siapa saja yang mengonfirmasi hadir (RSVP), ragu-ragu, tidak hadir, serta mendaftar ucapan doa secara real-time."
    },
    {
        question: "Berapa kapasitas foto dan video yang bisa dimasukkan?",
        answer: "Setiap tema memiliki kapasitas galeri yang berbeda, namun umumnya Anda dapat memasukkan sekitar 10 hingga 20 foto dan 1 video prewedding (berupa link YouTube). Semua foto akan kami bantu kompres agar undangan tetap cepat diakses tanpa merusak resolusi."
    },
    {
        question: "Apakah masa aktif undangan ada batasnya?",
        answer: "Kami menawarkan masa aktif permanen (seumur hidup) maupun tahunan untuk undangan Anda. Biayanya sudah jelas tanpa biaya langganan bulanan."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-elegant-dark mb-4 tracking-tight">Kerap Ditanyakan</h2>
                    <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
                        Jawaban untuk pertanyaan yang paling sering diajukan (FAQ) terkait layanan pemesanan undangan digital Sinvitation.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-gray-50/50 border border-gray-100 rounded-3xl overflow-hidden hover:border-blue-100 transition-colors duration-300">
                            <button
                                onClick={() => toggleAccordion(idx)}
                                className="w-full flex justify-between items-center p-6 sm:p-8 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-bold transition-colors ${activeIndex === idx ? 'text-primary' : 'text-elegant-dark'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180 text-primary' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 sm:px-8 pb-8 text-gray-600 leading-relaxed text-[15px]">
                                            <div className="w-full h-px bg-gray-100 mb-6" /> {/* Divider */}
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
