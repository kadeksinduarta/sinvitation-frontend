import React, { useState, useEffect } from 'react';
import Layout from '../../components/admin/Layout';
import { apiAdmin } from '../../utils/api';
import { Plus, Link2, Copy, Check, Trash2, Globe, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminInvitations() {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ nama_pengantin: '' });
    const [copiedId, setCopiedId] = useState(null);

    const fetchInvitations = async () => {
        try {
            const response = await apiAdmin.getInvitations();
            setInvitations(response.data);
        } catch (error) {
            console.error('Failed to fetch invitations:', error);
            toast.error('Gagal memuat data undangan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await apiAdmin.createInvitation(formData);
            toast.success('Undangan berhasil dibuat');
            setFormData({ nama_pengantin: '' });
            setIsAdding(false);
            fetchInvitations();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal membuat undangan');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Hapus undangan ini? Data RSVP terkait mungkin tidak bisa diakses via token ini lagi.')) return;
        try {
            await apiAdmin.deleteInvitation(id);
            toast.success('Undangan dihapus');
            fetchInvitations();
        } catch (error) {
            toast.error('Gagal menghapus');
        }
    };

    const getAttendanceLink = (slug) => {
        // Use production URL if available, otherwise use current origin
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/client/attendance/${slug}`;
        }
        return `/client/attendance/${slug}`;
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success('Link disalin!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Undangan</h1>
                    <p className="text-gray-600">Buat slug undangan dan kelola link kehadiran</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Undangan
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 mb-6">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Buat Undangan Baru</h2>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pengantin / Klien</label>
                            <input
                                type="text"
                                placeholder="Contoh: Dwadnyana & Elwi"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.nama_pengantin}
                                onChange={(e) => setFormData({ ...formData, nama_pengantin: e.target.value })}
                                required
                            />
                            <p className="text-xs text-gray-400 mt-1">Slug akan dibuat otomatis, contoh: dwadnyana-elwi</p>
                        </div>
                        <div className="flex items-end gap-2">
                            <button
                                type="submit"
                                className="w-full h-[42px] bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
                            >
                                Simpan Undangan
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="h-[42px] px-4 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 font-bold"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-500 italic">Memuat data...</div>
            ) : invitations.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500">Belum ada undangan yang dibuat.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {invitations.map((item) => {
                        const attendanceLink = getAttendanceLink(item.slug);
                        return (
                            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Globe className="w-4 h-4 text-blue-500" />
                                            <h3 className="font-bold text-gray-900 text-lg">{item.nama_pengantin}</h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">Slug: {item.slug}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <a
                                            href={attendanceLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Buka Link Kehadiran"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Link Data Kehadiran */}
                                <div className="mt-4">
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Link Data Kehadiran</label>
                                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                                        <Link2 className="w-4 h-4 text-blue-400 shrink-0" />
                                        <code className="text-xs font-mono text-blue-600 truncate flex-1">{attendanceLink}</code>
                                        <button
                                            onClick={() => copyToClipboard(attendanceLink, item.id)}
                                            className="p-1.5 hover:bg-white rounded shadow-sm transition-colors text-blue-600"
                                            title="Copy Link"
                                        >
                                            {copiedId === item.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Layout>
    );
}
