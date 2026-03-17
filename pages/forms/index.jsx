import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Heart, Cake, Sparkles, ArrowRight, FileText } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const formItems = [
    {
        title: 'Wedding Invitation',
        description: 'Buat undangan pernikahan digital yang elegan dan romantis. Lengkapi data mempelai, acara, dan lokasi Anda.',
        href: '/forms/WeddingForm',
        icon: Heart,
        color: 'pink',
        gradient: 'from-pink-500 to-rose-500',
        bgGradient: 'from-pink-50 to-rose-50',
        borderColor: 'border-pink-200',
        hoverBorder: 'hover:border-pink-400',
        iconBg: 'bg-pink-100',
        iconColor: 'text-pink-600',
        buttonBg: 'bg-pink-600 hover:bg-pink-700',
        emoji: '💍',
    },
    {
        title: 'Birthday Invitation',
        description: 'Buat undangan ulang tahun yang seru dan penuh warna. Isi detail acara dan pesta Anda dengan mudah.',
        href: '/forms/BirthdayForm',
        icon: Cake,
        color: 'orange',
        gradient: 'from-orange-500 to-amber-500',
        bgGradient: 'from-orange-50 to-amber-50',
        borderColor: 'border-orange-200',
        hoverBorder: 'hover:border-orange-400',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        buttonBg: 'bg-orange-600 hover:bg-orange-700',
        emoji: '🎂',
    },
    {
        title: 'Metatah Invitation',
        description: 'Buat undangan upacara Metatah secara digital. Lengkapi data peserta dan info acara serta resepsi.',
        href: '/forms/MetatahForm',
        icon: Sparkles,
        color: 'purple',
        gradient: 'from-purple-500 to-violet-500',
        bgGradient: 'from-purple-50 to-violet-50',
        borderColor: 'border-purple-200',
        hoverBorder: 'hover:border-purple-400',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        buttonBg: 'bg-purple-600 hover:bg-purple-700',
        emoji: '🙏',
    },
];

export default function FormsIndex() {
    return (
        <>
            <Head>
                <title>Form Pemesanan Undangan Digital | SInvitation</title>
                <meta name="description" content="Pesan undangan digital premium - Wedding, Birthday, dan Metatah. Isi form data, upload bukti transfer, dan tim kami segera memproses pesanan Anda." />
                <meta name="keywords" content="pesan undangan digital, order undangan online, form pemesanan undangan, undangan pernikahan order, SInvitation order" />
                <link rel="canonical" href="https://sinvitation.my.id/forms" />

                <meta property="og:title" content="Form Pemesanan Undangan Digital | SInvitation" />
                <meta property="og:description" content="Pesan undangan digital premium - Wedding, Birthday, dan Metatah." />
                <meta property="og:url" content="https://sinvitation.my.id/forms" />
                <meta property="og:image" content="https://sinvitation.my.id/images/Logo-latar.png" />

                <meta name="twitter:title" content="Form Pemesanan Undangan Digital | SInvitation" />
                <meta name="twitter:description" content="Pesan undangan digital premium - Wedding, Birthday, dan Metatah." />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://sinvitation.my.id"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Form Pemesanan",
                                    "item": "https://sinvitation.my.id/forms"
                                }
                            ]
                        })
                    }}
                />
            </Head>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-32 pb-20 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm text-gray-500 mb-6">
                            <FileText className="w-4 h-4" />
                            <span>Form Pengisian Data</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Pesan Undangan Digital
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Pilih jenis undangan yang Anda inginkan, lalu lengkapi form pengisian data. 
                            Tim kami akan segera memproses pesanan Anda.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {formItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link key={item.title} href={item.href} className="group block">
                                    <div className={`bg-white rounded-3xl border-2 ${item.borderColor} ${item.hoverBorder} p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col`}>
                                        {/* Icon & Emoji */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                                <Icon className={`w-7 h-7 ${item.iconColor}`} />
                                            </div>
                                            <span className="text-3xl">{item.emoji}</span>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                            {item.description}
                                        </p>

                                        {/* Button */}
                                        <div className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl ${item.buttonBg} text-white font-bold text-sm transition-all group-hover:shadow-lg group-hover:gap-3`}>
                                            <span>Isi Form</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Info */}
                    <div className="mt-14 text-center">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl mx-auto">
                            <p className="text-gray-500 text-sm">
                                <span className="font-bold text-gray-700">💡 Cara Order:</span>{' '}
                                Pilih jenis undangan → Isi form data → Upload bukti transfer → Tim kami proses pesanan Anda
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
