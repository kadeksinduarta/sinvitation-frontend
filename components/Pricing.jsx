import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const packages = [
    {
        name: 'Paket Basic',
        price: '125.000',
        originalPrice: '175.000',
        features: [
            'Masa Aktif 1 Tahun',
            'Nama Tamu Tanpa Batas',
            'Bebas Pilih Backsound',
            'Fitur RSVP & Hadiah',
            'Pengerjaan 2-3 Hari',
        ],
        isPopular: false,
    },
    {
        name: 'Paket Signature',
        price: '200.000',
        originalPrice: '300.000',
        features: [
            'Semua Fitur Paket Basic',
            'Template Premium',
            'Hingga 30 Galeri Foto',
            'Wedding Video Link',
            'Bebas Revisi Sepuasnya',
            'Pengerjaan 1-2 Hari',
        ],
        isPopular: true,
    },
];

const Pricing = () => {
    return (
        <section id="pilihan-paket" className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-elegant-dark mb-4">Pilihan Paket</h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-lg">Investasi terjangkau untuk undangan digital berkualitas tinggi.</p>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
                    {packages.map((pkg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex-1 p-10 rounded-[2.5rem] border ${pkg.isPopular ? 'border-primary bg-soft-blue/30' : 'border-gray-100 bg-white'} relative`}
                        >
                            {pkg.isPopular && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                    Paling Populer
                                </span>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-elegant-dark mb-4">{pkg.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-elegant-dark">IDR {pkg.price}</span>
                                    <span className="text-sm text-gray-400 line-through">IDR {pkg.originalPrice}</span>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 w-full mb-8" />

                            <ul className="space-y-4 mb-10">
                                {pkg.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={`https://api.whatsapp.com/send?phone=+6283115998178&text=Halo+Sinvitation%2C+saya+ingin+memesan+${pkg.name}`}
                                target="_blank"
                                className={`block w-full text-center py-4 rounded-2xl font-bold text-sm transition-all ${pkg.isPopular
                                    ? 'bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20'
                                    : 'bg-elegant-dark text-white hover:bg-gray-800'
                                    }`}
                            >
                                Pesan Sekarang
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
