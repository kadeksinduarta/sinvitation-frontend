import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
    { title: 'Custom Font', desc: 'Pilihan font yang elegan dan modern untuk undangan Anda.', icon: 'pen.png' },
    { title: 'Musik Latar', desc: 'Tambahkan musik romantis untuk suasana yang lebih hidup.', icon: 'audio.png' },
    { title: 'Buku Tamu', desc: 'Simpan ucapan dan doa dari para tamu undangan.', icon: 'chat.png' },
    { title: 'Sistem RSVP', desc: 'Kelola kehadiran tamu dengan lebih rapi dan mudah.', icon: 'list.png' },
    { title: 'Navigasi Maps', desc: 'Mudahkan tamu menemukan lokasi acara dengan presisi.', icon: 'map.png' },
    { title: 'Galeri Foto', desc: 'Tampilkan foto-foto prewedding Anda yang indah.', icon: 'foto.png' },
    { title: 'Amplop Digital', desc: 'Menerima hadiah pernikahan secara digital dengan aman.', icon: 'gift.png' },
    { title: 'Responsive', desc: 'Desain yang nyaman dilihat di semua jenis perangkat.', icon: 'responsive.png' },
];

const Features = () => {
    return (
        <section id="features" className="py-24 px-6 md:px-12 bg-gray-50/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-elegant-dark mb-4">Fitur Lengkap</h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-lg">Semua yang Anda butuhkan untuk membuat undangan digital yang berkesan ada di sini.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="mb-6 w-14 h-14 flex items-center justify-center bg-soft-blue rounded-2xl group-hover:bg-primary transition-colors">
                                <Image
                                    src={`/images/${feature.icon}`}
                                    alt={feature.title}
                                    width={28}
                                    height={28}
                                    style={{ width: 'auto', height: 'auto' }}
                                    className="object-contain group-hover:brightness-0 group-hover:invert transition-all"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-elegant-dark mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
