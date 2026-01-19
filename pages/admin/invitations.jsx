import React, { useState, useEffect } from 'react';
import Layout from '../../components/admin/Layout';
import { apiAdmin } from '../../utils/api';
import { Plus, Key, Copy, Check, Trash2, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminInvitations() {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ slug: '', client_name: '' });
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
            setFormData({ slug: '', client_name: '' });
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

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success('Token disalin!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Token Undangan</h1>
                    <p className="text-gray-600">Buat slug dan token untuk dihubungkan ke WordPress</p>
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
                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 mb-6 animate-in fade-in slide-in-from-top-4">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Buat Undangan Baru</h2>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Client</label>
                            <input
                                type="text"
                                placeholder="Contoh: Sindu & Tasya"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.client_name}
                                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (Link)</label>
                            <input
                                type="text"
                                placeholder="Contoh: sindu-tasya"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                required
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full h-[42px] bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
                            >
                                Simpan Undangan
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
                    {invitations.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Globe className="w-4 h-4 text-blue-500" />
                                    <h3 className="font-bold text-gray-900 text-lg">{item.client_name}</h3>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">Slug: {item.slug}</span>
                                </div>
                            </div>

                            <div className="flex-1 w-full md:max-w-md">
                                <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">X-API-KEY (WordPress)</label>
                                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                                    <Key className="w-4 h-4 text-orange-400 shrink-0" />
                                    <code className="text-xs font-mono text-gray-600 truncate flex-1">{item.api_key}</code>
                                    <button
                                        onClick={() => copyToClipboard(item.api_key, item.id)}
                                        className="p-1.5 hover:bg-white rounded shadow-sm transition-colors text-blue-600"
                                        title="Copy Token"
                                    >
                                        {copiedId === item.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Hapus"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
}
