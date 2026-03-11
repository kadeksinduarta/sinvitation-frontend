import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/#home' },
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pilihan-paket' },
        { name: 'Catalogue', href: '/#portfolio' },
        { name: 'Form Order', href: '/forms' },
    ];

    const products = [
        { name: 'Wedding Invitations', href: '/product/undangan' },
        { name: 'Instagram Filters', href: '/product/filter' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-8 py-6',
                scrolled ? 'bg-white/90 backdrop-blur-xl py-4 border-b border-gray-100 shadow-sm' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="relative w-[110px] h-[35px] md:w-[130px] md:h-[45px]">
                    <Image
                        src="/images/logo.png"
                        alt="SInvitation Logo"
                        fill
                        sizes="(max-width: 768px) 110px, 130px"
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-all duration-300 hover:text-primary",
                                "text-elegant-dark/70"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="relative group">
                        <button className={cn(
                            "flex items-center space-x-1 text-sm font-medium transition-all duration-300 cursor-pointer group-hover:text-primary",
                            "text-elegant-dark/70"
                        )}>
                            <span>Product</span>
                            <ChevronDown size={14} />
                        </button>
                        <div className="absolute top-full right-0 mt-4 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[220px] overflow-hidden border border-gray-100 p-2">
                            {products.map((product) => (
                                <Link
                                    key={product.name}
                                    href={product.href}
                                    className="block px-4 py-3 text-[13px] text-gray-600 hover:bg-soft-blue hover:text-primary rounded-xl transition-all"
                                >
                                    {product.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link
                        href="https://api.whatsapp.com/send?phone=+6283115998178&text=hai+Sinvition%2C+saya+ingin+memesan+undangan+digital"
                        target="_blank"
                        className="px-6 py-2.5 rounded-xl bg-elegant-dark text-white font-bold text-sm transition-all duration-300 hover:bg-primary hover:shadow-lg hover:-translate-y-1"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 text-elegant-dark transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl overflow-hidden px-6"
                    >
                        <div className="flex flex-col space-y-4 py-10 border-t border-gray-50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-elegant-dark text-lg font-semibold hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-3">
                                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">Products</p>
                                {products.map((product) => (
                                    <Link
                                        key={product.name}
                                        href={product.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-elegant-dark text-lg font-semibold hover:text-primary transition-colors"
                                    >
                                        {product.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="pt-6">
                                <Link
                                    href="https://api.whatsapp.com/send?phone=+6283115998178&text=hai+Sinvition%2C+saya+ingin+memesan+undangan+digital"
                                    target="_blank"
                                    className="block bg-elegant-dark text-white text-center py-4 rounded-2xl font-bold shadow-xl"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
