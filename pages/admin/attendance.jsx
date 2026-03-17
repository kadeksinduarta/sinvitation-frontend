import React, { useState, useEffect } from 'react';
import Layout from '../../components/admin/Layout';
import { apiAdmin } from '../../utils/api';
import { Search, UserCheck, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminAttendance() {
    const [attendances, setAttendances] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    
    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRsvp, setEditingRsvp] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchAttendances = async () => {
        try {
            const response = await apiAdmin.getAttendance();
            setAttendances(response.data.data);
            setStats(response.data.stats);
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

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data kehadiran ini?')) return;
        
        try {
            await apiAdmin.deleteAttendance(id);
            toast.success('Data kehadiran berhasil dihapus');
            fetchAttendances();
        } catch (error) {
            console.error('Failed to delete attendance:', error);
            toast.error('Gagal menghapus data kehadiran');
        }
    };

    const handleEditClick = (rsvp) => {
        setEditingRsvp({
            ...rsvp,
            status_kehadiran: rsvp.status_kehadiran
        });
        setIsEditModalOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value, type } = e.target;
        setEditingRsvp(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await apiAdmin.updateAttendance(editingRsvp.id, {
                nama_tamu: editingRsvp.nama_tamu,
                jumlah_kehadiran: editingRsvp.jumlah_kehadiran,
                status_kehadiran: editingRsvp.status_kehadiran
            });
            toast.success('Data kehadiran berhasil diperbarui');
            setIsEditModalOpen(false);
            fetchAttendances();
        } catch (error) {
            console.error('Failed to update attendance:', error);
            toast.error('Gagal memperbarui data kehadiran');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredAttendances = attendances.filter(item =>
        item.nama_tamu?.toLowerCase().includes(search.toLowerCase()) ||
        item.invitation?.slug?.toLowerCase().includes(search.toLowerCase())
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

            {stats && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                        <span className="text-gray-500 text-sm">Total RSVP</span>
                        <span className="text-2xl font-bold text-gray-800">{stats.total}</span>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-100 flex flex-col">
                        <span className="text-green-600 text-sm">Hadir (Jumlah Orang)</span>
                        <span className="text-2xl font-bold text-green-700">{stats.hadir}</span>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-100 flex flex-col">
                        <span className="text-red-600 text-sm">Tidak Hadir</span>
                        <span className="text-2xl font-bold text-red-700">{stats.tidak_hadir}</span>
                    </div>
                </div>
            )}

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
                                    <th className="px-6 py-4">Waktu</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {filteredAttendances.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <UserCheck className="w-4 h-4 text-blue-500" />
                                                    <span className="font-semibold text-gray-900">{item.nama_tamu}</span>
                                                </div>
                                                <span className="text-xs text-gray-500 ml-6">({item.jumlah_kehadiran} orang)</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-mono lowercase">
                                                {item.invitation?.slug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.status_kehadiran === 'hadir'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {item.status_kehadiran === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">
                                            {new Date(item.created_at).toLocaleString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleEditClick(item)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && editingRsvp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800">Edit Data Kehadiran</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Tamu</label>
                                <input
                                    type="text"
                                    name="nama_tamu"
                                    value={editingRsvp.nama_tamu}
                                    onChange={handleEditChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Hadir (Orang)</label>
                                <input
                                    type="number"
                                    name="jumlah_kehadiran"
                                    value={editingRsvp.jumlah_kehadiran}
                                    onChange={handleEditChange}
                                    required
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status Kehadiran</label>
                                <select
                                    name="status_kehadiran"
                                    value={editingRsvp.status_kehadiran}
                                    onChange={handleEditChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="hadir">Hadir</option>
                                    <option value="tidak_hadir">Tidak Hadir</option>
                                </select>
                            </div>
                            
                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
