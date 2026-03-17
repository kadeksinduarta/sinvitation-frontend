import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white pt-20 pb-10 px-6 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/images/logo.png"
                                alt="SInvitation"
                                width={140}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-gray-500 text-base max-w-sm mb-6 font-medium">
                            Platform undangan digital premium di Bali. Mewujudkan undangan impianmu dengan desain yang modern dan elegan.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Instagram size={20} />, href: "https://www.instagram.com/sinvitation.my.id" },
                                { icon: <Send size={20} />, href: "https://api.whatsapp.com/send?phone=+6283115998178" },
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    target="_blank"
                                    className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl text-elegant-dark hover:bg-primary hover:text-white transition-all shadow-sm"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-elegant-dark font-bold text-sm mb-6">Menu</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'Tentang Kami', href: '/about' },
                                { label: 'Katalog Undangan', href: '/product/undangan' },
                                { label: 'Filter Instagram', href: '/product/filter' },
                                { label: 'Form Pemesanan', href: '/forms' },
                                { label: 'Kirim Undangan', href: '/kirim-undangan' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-500 text-sm font-medium hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-elegant-dark font-bold text-sm mb-6">Kontak</h4>
                        <ul className="space-y-3">
                            <li className="text-gray-500 text-sm font-medium">Gianyar, Bali, Indonesia</li>
                            <li>
                                <a href="https://api.whatsapp.com/send?phone=+6283115998178" target="_blank" className="text-gray-500 text-sm font-medium hover:text-primary transition-colors">
                                    +62 831 1599 8178
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/sinvitation.my.id" target="_blank" className="text-gray-500 text-sm font-medium hover:text-primary transition-colors">
                                    @sinvitation.my.id
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs font-medium">
                        &copy; {new Date().getFullYear()} SInvitation. All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="text-gray-400 text-xs font-medium hover:text-primary transition-colors">Kebijakan Privasi</Link>
                        <Link href="/terms-of-service" className="text-gray-400 text-xs font-medium hover:text-primary transition-colors">Syarat & Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
