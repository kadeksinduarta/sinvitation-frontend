import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { cn } from '@/utils/cn';
import { apiClient, getStorageUrl } from '@/utils/api';

const ThemePortfolio = () => {
    const [filter, setFilter] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Categories for filtering
    const categories = ['All', 'Isi Foto', 'Tanpa Foto', 'Wedding', 'Birthday', 'Metatah'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.getPublicProducts();
                // Filter for active products only just in case backend returns all
                const activeProducts = response.data.filter(p => p.status === 'active');
                setProducts(activeProducts);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter Logic
    const filteredThemes = products.filter(theme => {
        if (filter === 'All') return true;

        // Special filters based on has_photo
        if (filter === 'Isi Foto') return theme.has_photo === true;
        if (filter === 'Tanpa Foto') return theme.has_photo === false;

        // Standard Category Filter (Wedding, Birthday, etc) - case insensitive comparison
        return theme.category.toLowerCase() === filter.toLowerCase();
    });

    return (
        <section id="portfolio" className="py-24 px-6 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-elegant-dark mb-4">Katalog Undangan</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-10">Pilih berbagai desain template undangan pernikahan yang modern dan sesuai dengan style Anda.</p>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                                    filter === cat
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading portfolio...</div>
                ) : filteredThemes.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">Belum ada tema untuk kategori ini.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredThemes.map((theme) => (
                                <motion.div
                                    key={theme.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                        <img
                                            src={getStorageUrl(theme.image)}
                                            alt={theme.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {/* Badges for Photo Status */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {theme.has_photo ? (
                                                <span className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-full text-gray-800 shadow-sm">
                                                    Isi Foto
                                                </span>
                                            ) : (
                                                <span className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-full text-gray-800 shadow-sm">
                                                    Tanpa Foto
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">
                                                    {theme.category}
                                                </span>
                                                <h3 className="text-2xl font-bold text-elegant-dark">{theme.name}</h3>
                                            </div>
                                            {theme.price && (
                                                <p className="text-lg font-black text-primary">IDR {Number(theme.price).toLocaleString('id-ID')}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            {theme.preview_link && (
                                                <a
                                                    href={theme.preview_link}
                                                    target="_blank"
                                                    className="flex-1 flex items-center justify-center gap-2 bg-elegant-dark text-white py-3 rounded-xl font-bold text-sm hover:bg-primary transition-colors"
                                                >
                                                    Demo <ExternalLink size={16} />
                                                </a>
                                            )}
                                            <a
                                                href={`https://api.whatsapp.com/send?phone=+6283115998178&text=Halo+Sinvitation%2C+saya+ingin+memesan+tema+${encodeURIComponent(theme.name)}`}
                                                target="_blank"
                                                className="p-3 bg-gray-50 text-elegant-dark rounded-xl hover:bg-primary hover:text-white transition-all"
                                            >
                                                <ShoppingBag size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                <div className="mt-20 text-center">
                    <a
                        href="/product/undangan"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:underline underline-offset-8"
                    >
                        Lihat Lebih Banyak Desain <ExternalLink size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ThemePortfolio;
