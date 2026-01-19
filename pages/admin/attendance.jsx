import React, { useState, useEffect } from 'react';
import Layout from '../../components/admin/Layout';
import { apiAdmin } from '../../utils/api';
import { Search, UserCheck, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAttendance() {
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchAttendances = async () => {
        try {
            const response = await apiAdmin.getAttendance();
            setAttendances(response.data);
        } catch (error) {
            console.error('Failed to fetch attendance:', error);
            toast.error('Gagal memuat data kehadiran');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendances();
    }, []);

    const filteredAttendances = attendances.filter(item =>
        item.guest_name.toLowerCase().includes(search.toLowerCase()) ||
        item.invitation_slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Daftar Kehadiran (RSVP)</h1>
                    <p className="text-gray-600">Pantau tamu yang mengisi form di seluruh undangan</p>
                </div>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Cari nama atau slug..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500 italic">Memuat data...</div>
            ) : filteredAttendances.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500">Belum ada data kehadiran.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-4">Tamu</th>
                                    <th className="px-6 py-4">Undangan</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Pesan</th>
                                    <th className="px-6 py-4">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredAttendances.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <UserCheck className="w-4 h-4 text-blue-500" />
                                                <span className="font-semibold text-gray-900">{item.guest_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-mono lowercase">
                                                {item.invitation_slug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.attendance === 'Hadir'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {item.attendance}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                            {item.message ? (
                                                <div className="flex items-start gap-1">
                                                    <MessageSquare className="w-3.5 h-3.5 mt-0.5 text-gray-400 shrink-0" />
                                                    <span>{item.message}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-300 italic">Tanpa pesan</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">
                                            {new Date(item.created_at).toLocaleString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Layout>
    );
}
