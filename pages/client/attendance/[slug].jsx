import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '../../../utils/api';
import { UserCheck, Users, ArrowLeft } from 'lucide-react';
import Head from 'next/head';

export default function ClientAttendance() {
    const router = useRouter();
    const { slug } = router.query;
    const [attendances, setAttendances] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAttendances = async () => {
        if (!slug) return;
        try {
            const response = await apiClient.getAttendanceBySlug(slug);
            setAttendances(response.data.data || []);
            setStats(response.data.stats || null);
        } catch (error) {
            console.error('Failed to fetch attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendances();
    }, [slug]);

    if (!slug && !loading) {
        return <div className="p-8 text-center">Invalid Request</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <Head>
                <title>Daftar Hadir | {slug}</title>
            </Head>

            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-white rounded-full transition-colors shadow-sm text-gray-600"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 capitalize">Tamu Undangan {slug?.replace(/-/g, ' ')}</h1>
                        <p className="text-gray-500">Daftar pesan dan konfirmasi kehadiran tamu Anda</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 italic">Memuat data...</p>
                    </div>
                ) : attendances.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserCheck className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Belum ada RSVP</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                            Ketika tamu mengisi form kehadiran, data mereka akan muncul di sini.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 mb-2">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total RSVP</p>
                                <p className="text-2xl font-bold text-gray-900">{stats?.total || attendances.length}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100">
                                <p className="text-xs text-green-600 uppercase font-bold tracking-wider">Hadir</p>
                                <p className="text-2xl font-bold text-green-700">
                                    {stats?.hadir || attendances.filter(a => a.status_kehadiran === 'hadir').length}
                                </p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-100">
                                <p className="text-xs text-red-600 uppercase font-bold tracking-wider">Tidak Hadir</p>
                                <p className="text-2xl font-bold text-red-700">
                                    {stats?.tidak_hadir || attendances.filter(a => a.status_kehadiran === 'tidak_hadir').length}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {attendances.map((item) => (
                                    <div key={item.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                    {item.nama_tamu?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{item.nama_tamu}</h4>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Users className="w-3 h-3" />
                                                        <span>{item.jumlah_kehadiran} orang</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.status_kehadiran === 'hadir'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {item.status_kehadiran === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                                            </span>
                                        </div>

                                        <div className="mt-4 text-[10px] text-gray-400 text-right">
                                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'long', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <footer className="mt-12 text-center text-gray-400 text-xs">
                &copy; {new Date().getFullYear()} Sinvitation RSVP System
            </footer>
        </div>
    );
}
