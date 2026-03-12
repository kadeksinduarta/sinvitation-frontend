import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Video, Users, CheckCircle } from 'lucide-react';

const services = [
    {
        title: 'Revisi Sepuasnya',
        desc: 'Tidak perlu khawatir salah ketik atau ganti hari, kami berikan layanan revisi teks dan foto sampai undangan Anda benar-benar fix dan sempurna.',
        icon: PenTool
    },
    {
        title: 'Tutorial Pengisian Tamu',
        desc: 'Kami akan berikan panduan lengkap dan alat otomatis agar Anda bisa menyesuaikan nama tamu pada setiap link yang dikirim secara mudah.',
        icon: Video
    },
    {
        title: 'Dashboard Kehadiran',
        desc: 'Tersedia link khusus untuk Anda memantau siapa saja yang sudah mengonfirmasi hadir (RSVP) beserta kumpulan ucapan dari tamu.',
        icon: Users
    },
    {
        title: 'Siap Pakai & Praktis',
        desc: 'Terima beres! Anda tidak perlu pusing memikirkan coding, hosting, atau server. Tim kami akan menyiapkan semuanya dalam waktu singkat.',
        icon: CheckCircle
    }
];

const Services = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-soft-blue">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-elegant-dark mb-4 tracking-tight">Pelayanan Ekstra Kami</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Kami tidak hanya membuatkan undangan digital, tapi juga siap membantu dan mendampingi Anda hingga hari H acara tiba.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-blue-50 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
                            >
                                <div className="mb-6 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-elegant-dark mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {service.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
