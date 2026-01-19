import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Play } from 'lucide-react';

const filters = [
    { id: 1, name: 'Natural Beauty', image: 'https://raw.githubusercontent.com/kadeksinduarta/gambar-web/43edb87a99ded09a06406db1895a6e962887ffd9/filter-1s.png', link: 'https://www.instagram.com/ar/975536930887060/' },
    { id: 2, name: 'Soft Glow', image: 'https://raw.githubusercontent.com/kadeksinduarta/gambar-web/43edb87a99ded09a06406db1895a6e962887ffd9/filter-2s.png', link: 'https://www.instagram.com/ar/788257413021506/' },
    { id: 3, name: 'Elegant Wedding', image: 'https://raw.githubusercontent.com/kadeksinduarta/gambar-web/43edb87a99ded09a06406db1895a6e962887ffd9/filter-3s.png', link: 'https://www.instagram.com/ar/1470823510522709/' },
    { id: 4, name: 'Classy Moments', image: 'https://github.com/kadeksinduarta/gambar-web/blob/main/filter-4%20(3).png?raw=true', link: 'https://www.instagram.com/ar/958179595775393/' },
];

const FilterDemo = () => {
    return (
        <section id="demo-filter" className="py-24 px-6 md:px-12 bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-elegant-dark mb-4">Filter Instagram</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-10">Lengkapi hari bahagiamu dengan custom filter Instagram yang unik dan eksklusif.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filters.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative aspect-square overflow-hidden bg-gray-100">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play size={16} fill="white" />
                                </div>
                            </div>

                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-elegant-dark mb-6 group-hover:text-primary transition-colors">{item.name}</h3>
                                <div className="flex flex-col gap-3">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        className="flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all"
                                    >
                                        Coba Filter <ExternalLink size={16} />
                                    </a>
                                    <a
                                        href={`https://api.whatsapp.com/send?phone=+6283115998178&text=Halo+Sinvitation%2C+saya+ingin+memesan+filter+IG+${item.name}`}
                                        target="_blank"
                                        className="text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                                    >
                                        Pesan Sekarang
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="/product/filter"
                        className="inline-flex items-center gap-2 text-elegant-dark/60 font-bold hover:text-primary transition-colors"
                    >
                        Lihat Seluruh Koleksi Filter &#187;
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FilterDemo;
