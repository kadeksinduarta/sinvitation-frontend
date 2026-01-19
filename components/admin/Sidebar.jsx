import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutGrid, ClipboardList, LogOut, Package, UserCheck, Key } from 'lucide-react';
import { apiAuth } from '../../utils/api';

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await apiAuth.logout();
            localStorage.removeItem('token');
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const isActive = (path) => router.pathname === path;

    return (
        <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 flex flex-col z-10 transition-transform duration-300">
            <div className="p-6 flex items-center border-b">
                <span className="text-xl font-bold text-indigo-600 tracking-wide">Sinvitation</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <Link href="/admin/dashboard" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive('/admin/dashboard') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <LayoutGrid className="w-5 h-5 mr-3" />
                    Beranda
                </Link>

                <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Pesanan
                </div>
                <Link href="/admin/wedding" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive('/admin/wedding') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <ClipboardList className="w-5 h-5 mr-3" />
                    Pernikahan
                </Link>
                <Link href="/admin/birthday" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive('/admin/birthday') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <ClipboardList className="w-5 h-5 mr-3" />
                    Birthday
                </Link>
                <Link href="/admin/metatah" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive('/admin/metatah') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <ClipboardList className="w-5 h-5 mr-3" />
                    Metatah
                </Link>

                <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    RSVP & Keamanan
                </div>
                <Link href="/admin/attendance" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive('/admin/attendance') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <UserCheck className="w-5 h-5 mr-3" />
                    Daftar RSVP
                </Link>
                <Link href="/admin/invitations" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive('/admin/invitations') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <Key className="w-5 h-5 mr-3" />
                    Tokens Undangan
                </Link>

                <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Katalog
                </div>
                <Link href="/admin/products" className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive('/admin/products') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <Package className="w-5 h-5 mr-3" />
                    Data Produk
                </Link>
            </nav>

            <div className="p-4 border-t">
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-150">
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
