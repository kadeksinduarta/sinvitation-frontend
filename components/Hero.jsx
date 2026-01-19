import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 bg-white overflow-hidden">
            {/* Background Accents - Subtler */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-soft-blue/40 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
                            Premium Invitation Service
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-elegant-dark leading-[1.1] mb-8">
                            Undangan Digital <br />
                            <span className="text-primary italic">Modern & Elegan</span>
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-lg mb-12 mx-auto lg:mx-0 leading-relaxed">
                            Abadikan momen indahmu dengan undangan digital yang profesional, responsif, dan mudah dibagikan.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.a
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                href="#portfolio"
                                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
                            >
                                Lihat Katalog
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                href="https://api.whatsapp.com/send?phone=+6283115998178"
                                className="bg-white text-elegant-dark px-10 py-4 rounded-2xl font-bold text-sm border border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                Konsultasi Gratis
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative flex justify-center"
                    >
                        {/* Container with padding so scale doesn't "cut off" against parent edges if applied */}
                        <div className="relative w-full max-w-[480px] aspect-[4/5] group">
                            <div className="absolute inset-4 bg-primary/10 rounded-[3rem] -rotate-3 transition-transform duration-700 group-hover:rotate-0" />
                            <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl bg-gray-50">
                                <Image
                                    src="/images/hero image.png"
                                    alt="Sinvitation Preview"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating WA */}
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://api.whatsapp.com/send?phone=+6283115998178"
                target="_blank"
                className="fixed bottom-8 right-8 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl border-4 border-white"
            >
                <Image
                    src="https://raw.githubusercontent.com/kadeksinduarta/gambar-bli-kadek/fc634830eb151afc8e4566e929420e44b2dd0024/wa.svg"
                    alt="WA"
                    width={28}
                    height={28}
                    className="brightness-0 invert"
                />
            </motion.a>
        </section>
    );
};

export default Hero;
