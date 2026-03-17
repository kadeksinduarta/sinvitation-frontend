import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Heart, Sparkles, Users, Award, Clock, Shield, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const stats = [
    { label: 'Undangan Dibuat', value: '500+', icon: Heart },
    { label: 'Klien Puas', value: '300+', icon: Users },
    { label: 'Tema Tersedia', value: '20+', icon: Sparkles },
    { label: 'Tahun Pengalaman', value: '2+', icon: Award },
];

const values = [
    {
        title: 'Desain Premium',
        desc: 'Setiap undangan dirancang dengan estetika tinggi, menggunakan kombinasi warna, tipografi, dan layout yang memukau.',
        icon: Sparkles,
        gradient: 'from-violet-500 to-purple-600',
    },
    {
        title: 'Harga Terjangkau',
        desc: 'Kami percaya undangan digital berkualitas tidak harus mahal. Paket kami dirancang agar semua orang bisa merasakan kemewahan.',
        icon: Shield,
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        title: 'Pengerjaan Cepat',
        desc: 'Dengan tim berpengalaman, undangan digital Anda bisa siap dalam 1-3 hari kerja tanpa mengorbankan kualitas.',
        icon: Clock,
        gradient: 'from-amber-500 to-orange-600',
    },
    {
        title: 'Support Hingga Hari H',
        desc: 'Kami tidak hanya membuat, tapi juga mendampingi Anda hingga acara berlangsung. Revisi sepuasnya, bantuan kapan saja.',
        icon: Heart,
        gradient: 'from-rose-500 to-pink-600',
    },
];

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Tentang Kami — SInvitation | Undangan Digital Premium di Bali</title>
                <meta name="description" content="SInvitation adalah platform undangan digital premium berbasis di Bali, Indonesia. Kami menyediakan undangan pernikahan, ulang tahun, dan metatah dengan desain eksklusif dan harga terjangkau." />
                <meta name="keywords" content="tentang sinvitation, undangan digital bali, undangan digital premium, sinvitation profil" />
                <link rel="canonical" href="https://sinvitation.my.id/about" />

                <meta property="og:title" content="Tentang Kami — SInvitation" />
                <meta property="og:description" content="Platform undangan digital premium berbasis di Bali, Indonesia." />
                <meta property="og:url" content="https://sinvitation.my.id/about" />
                <meta property="og:image" content="https://sinvitation.my.id/images/Logo-latar.png" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sinvitation.my.id" },
                                { "@type": "ListItem", "position": 2, "name": "Tentang Kami", "item": "https://sinvitation.my.id/about" }
                            ]
                        })
                    }}
                />
            </Head>

            <Navbar />

            <main>
                {/* Hero Banner */}
                <section className="relative pt-36 pb-24 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-soft-blue via-white to-primary/5 -z-10" />
                    <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full -z-10" />

                    <div className="max-w-5xl mx-auto text-center">
                        <motion.span
                            {...fadeUp}
                            className="inline-block px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8"
                        >
                            Tentang Kami
                        </motion.span>
                        <motion.h1
                            {...fadeUp}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-elegant-dark leading-[1.1] mb-8"
                        >
                            Mewujudkan Undangan
                            <br />
                            <span className="text-primary italic">Impian Anda</span>
                        </motion.h1>
                        <motion.p
                            {...fadeUp}
                            transition={{ delay: 0.2 }}
                            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                        >
                            SInvitation hadir sebagai solusi undangan digital premium di Bali,
                            menggabungkan desain modern yang memukau dengan teknologi website terkini
                            untuk momen spesial Anda.
                        </motion.p>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 px-6 border-y border-gray-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, idx) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        {...fadeUp}
                                        transition={{ delay: idx * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-soft-blue rounded-2xl mb-4">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <p className="text-3xl md:text-4xl font-black text-elegant-dark mb-1">{stat.value}</p>
                                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div {...fadeUp}>
                                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
                                    Cerita Kami
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-elegant-dark mb-6 leading-tight">
                                    Dari Bali, Untuk Seluruh Indonesia
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>
                                        <strong className="text-elegant-dark">SInvitation</strong> lahir dari sebuah ide sederhana:
                                        bagaimana caranya agar setiap pasangan bisa memiliki undangan digital yang cantik,
                                        modern, dan profesional tanpa harus mengeluarkan biaya yang besar.
                                    </p>
                                    <p>
                                        Berbasis di <strong className="text-elegant-dark">Gianyar, Bali</strong>, kami memulai
                                        perjalanan ini dengan fokus pada kualitas desain dan pelayanan yang personal.
                                        Setiap undangan yang kami buat dikerjakan dengan perhatian penuh terhadap detail.
                                    </p>
                                    <p>
                                        Kami tidak hanya menyediakan undangan pernikahan, tapi juga untuk berbagai acara
                                        seperti <strong className="text-elegant-dark">ulang tahun</strong> dan upacara adat Bali
                                        seperti <strong className="text-elegant-dark">metatah (potong gigi)</strong>. Karena setiap
                                        momen spesial layak diabadikan dengan cara yang istimewa.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                {...fadeUp}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <div className="relative w-full aspect-square max-w-md mx-auto">
                                    <div className="absolute inset-4 bg-primary/10 rounded-[3rem] -rotate-3" />
                                    <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl bg-gradient-to-br from-soft-blue to-primary/10 flex items-center justify-center p-12">
                                        <Image
                                            src="/images/Logo-latar.png"
                                            alt="SInvitation Logo"
                                            width={400}
                                            height={400}
                                            className="object-contain drop-shadow-lg"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Our Values */}
                <section className="py-24 px-6 bg-gray-50/50">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <motion.h2
                                {...fadeUp}
                                className="text-3xl md:text-5xl font-bold text-elegant-dark mb-4"
                            >
                                Mengapa SInvitation?
                            </motion.h2>
                            <motion.p
                                {...fadeUp}
                                transition={{ delay: 0.1 }}
                                className="text-gray-500 max-w-xl mx-auto text-lg"
                            >
                                Nilai-nilai yang membuat kami berbeda dari yang lain.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {values.map((value, idx) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        {...fadeUp}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-500 group"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-elegant-dark mb-3">{value.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div {...fadeUp}>
                            <h2 className="text-3xl md:text-5xl font-bold text-elegant-dark mb-6">
                                Siap Membuat Undangan Digital?
                            </h2>
                            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
                                Konsultasikan kebutuhan undangan digital Anda secara gratis. Tim kami siap membantu!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://api.whatsapp.com/send?phone=+6283115998178&text=Halo+SInvitation%2C+saya+ingin+konsultasi+tentang+undangan+digital"
                                    target="_blank"
                                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-1"
                                >
                                    Konsultasi Gratis via WhatsApp
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                                <Link
                                    href="/forms"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-elegant-dark px-10 py-4 rounded-2xl font-bold text-sm border border-gray-200 hover:bg-gray-50 transition-all"
                                >
                                    Lihat Form Pemesanan
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16 px-6 bg-soft-blue/50 border-t border-gray-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div {...fadeUp} className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-elegant-dark mb-1">Lokasi</h4>
                                    <p className="text-gray-500 text-sm">Gianyar, Bali, Indonesia</p>
                                </div>
                            </motion.div>
                            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-elegant-dark mb-1">WhatsApp</h4>
                                    <a href="https://api.whatsapp.com/send?phone=+6283115998178" target="_blank" className="text-primary text-sm font-medium hover:underline">
                                        +62 831 1599 8178
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-elegant-dark mb-1">Instagram</h4>
                                    <a href="https://www.instagram.com/sinvitation.my.id" target="_blank" className="text-primary text-sm font-medium hover:underline">
                                        @sinvitation.my.id
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
