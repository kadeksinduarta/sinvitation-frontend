import React, { useState, useEffect } from 'react';
import Layout from '../../components/admin/Layout';
import OrderModal from '../../components/admin/OrderModal';
import { apiAdmin } from '../../utils/api';
import { Search, Eye, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const initialBirthdayForm = {
    tanggal: '',
    isi_foto: false,
    nama_pemesan: '',
    link_template: '',
    nama_yang_ulang_tahun: '',
    ultah_ke: '',
    tanggal_acara: '',
    waktu_acara: '',
    alamat_acara: '',
    link_lokasi_acara: '',
    link_drive_foto: '',
    lagu: '',
};

export default function AdminBirthday() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState(initialBirthdayForm);
    const [submitting, setSubmitting] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await apiAdmin.getOrders();
            setOrders(response.data.birthday || []);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error('Gagal memuat data pesanan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleView = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await apiAdmin.createBirthdayOrder(formData);
            toast.success('Data birthday berhasil disimpan!');
            setFormData(initialBirthdayForm);
            setIsAdding(false);
            fetchOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal menyimpan data');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredOrders = orders.filter(order =>
        (order.nama_pemesan || '').toLowerCase().includes(search.toLowerCase()) ||
        (order.nama_yang_ulang_tahun || '').toLowerCase().includes(search.toLowerCase())
    );

    const InputField = ({ label, name, type = 'text', required = false, placeholder = '' }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            />
        </div>
    );

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Birthday Orders</h1>
                    <p className="text-gray-600">Kelola pesanan undangan ulang tahun</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Cari pemesan/yang ultah..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap"
                    >
                        {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        {isAdding ? 'Tutup' : 'Tambah Data'}
                    </button>
                </div>
            </div>

            {/* Form Pengisian Data */}
            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 mb-6">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Form Pengisian Data Birthday</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Info Umum */}
                        <div>
                            <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-3 pb-2 border-b border-orange-100">Informasi Umum</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <InputField label="Nama Pemesan" name="nama_pemesan" required placeholder="Nama pemesan" />
                                <InputField label="Tanggal Order" name="tanggal" type="date" />
                                <InputField label="Link Template" name="link_template" placeholder="https://..." />
                                <div className="flex items-center gap-3 pt-6">
                                    <input type="checkbox" name="isi_foto" checked={formData.isi_foto} onChange={handleChange} className="w-4 h-4 rounded" />
                                    <label className="text-sm text-gray-700">Isi Foto</label>
                                </div>
                            </div>
                        </div>

                        {/* Birthday Specific */}
                        <div>
                            <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-3 pb-2 border-b border-orange-100">Detail Ulang Tahun</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Nama Yang Ulang Tahun" name="nama_yang_ulang_tahun" placeholder="Nama yang berulang tahun" />
                                <InputField label="Ultah Ke-" name="ultah_ke" placeholder="Contoh: 17" />
                            </div>
                        </div>

                        {/* Acara */}
                        <div>
                            <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-3 pb-2 border-b border-orange-100">Detail Acara</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Tanggal Acara" name="tanggal_acara" type="date" />
                                <InputField label="Waktu Acara" name="waktu_acara" placeholder="18:00 - 21:00 WITA" />
                                <InputField label="Alamat Acara" name="alamat_acara" placeholder="Alamat lengkap acara" />
                                <InputField label="Link Lokasi" name="link_lokasi_acara" placeholder="https://maps.google.com/..." />
                            </div>
                        </div>

                        {/* Additional */}
                        <div>
                            <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-3 pb-2 border-b border-orange-100">Tambahan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Link Drive Foto" name="link_drive_foto" placeholder="https://drive.google.com/..." />
                                <InputField label="Lagu / Backsound" name="lagu" placeholder="Judul lagu atau link" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                                Batal
                            </button>
                            <button type="submit" disabled={submitting} className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold disabled:opacity-50">
                                {submitting ? 'Menyimpan...' : 'Simpan Data'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-500">Memuat data...</div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500">Belum ada pesanan ulang tahun.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-orange-50 text-orange-700 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Pemesan</th>
                                    <th className="px-6 py-4">Yang Ultah</th>
                                    <th className="px-6 py-4">Ke-</th>
                                    <th className="px-6 py-4">Tgl Acara</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-orange-50/10 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.nama_pemesan}</td>
                                        <td className="px-6 py-4 text-gray-600">{order.nama_yang_ulang_tahun || '-'}</td>
                                        <td className="px-6 py-4 text-gray-600 font-bold">{order.ultah_ke || '-'}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {order.tanggal_acara ? new Date(order.tanggal_acara).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'short', year: 'numeric'
                                            }) : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'processed' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleView(order)}
                                                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                title="Lihat Detail"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
                onUpdate={fetchOrders}
            />
        </Layout>
    );
}
