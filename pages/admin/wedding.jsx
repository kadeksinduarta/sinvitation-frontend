import React, { useState, useEffect } from 'react';
import Layout from '../../components/admin/Layout';
import OrderModal from '../../components/admin/OrderModal';
import { apiAdmin } from '../../utils/api';
import { Search, Eye, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const initialWeddingForm = {
    tanggal: '',
    isi_foto: false,
    nama_pemesan: '',
    link_template: '',
    susunan_nama_mempelai: '',
    agama: '',
    nama_panggilan_wanita: '',
    nama_lengkap_wanita: '',
    nama_ortu_wanita: '',
    ig_wanita: '',
    nama_panggilan_pria: '',
    nama_lengkap_pria: '',
    nama_ortu_pria: '',
    ig_pria: '',
    tanggal_pernikahan: '',
    waktu_pernikahan: '',
    alamat_pernikahan: '',
    link_lokasi_pernikahan: '',
    tanggal_resepsi: '',
    waktu_resepsi: '',
    alamat_resepsi: '',
    link_lokasi_resepsi: '',
    amplop_digital: false,
    no_rek: '',
    link_drive_foto: '',
    lagu: '',
};

export default function AdminWedding() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState(initialWeddingForm);
    const [submitting, setSubmitting] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await apiAdmin.getOrders();
            setOrders(response.data.wedding || []);
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
            await apiAdmin.createWeddingOrder(formData);
            toast.success('Data wedding berhasil disimpan!');
            setFormData(initialWeddingForm);
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
        (order.nama_panggilan_pria || '').toLowerCase().includes(search.toLowerCase()) ||
        (order.nama_panggilan_wanita || '').toLowerCase().includes(search.toLowerCase())
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
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none text-sm"
            />
        </div>
    );

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Wedding Orders</h1>
                    <p className="text-gray-600">Kelola pesanan undangan pernikahan</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Cari pemesan..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors whitespace-nowrap"
                    >
                        {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        {isAdding ? 'Tutup' : 'Tambah Data'}
                    </button>
                </div>
            </div>

            {/* Form Pengisian Data */}
            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100 mb-6">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Form Pengisian Data Wedding</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Info Umum */}
                        <div>
                            <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3 pb-2 border-b border-pink-100">Informasi Umum</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <InputField label="Nama Pemesan" name="nama_pemesan" required placeholder="Nama pemesan" />
                                <InputField label="Tanggal Order" name="tanggal" type="date" />
                                <InputField label="Link Template" name="link_template" placeholder="https://..." />
                                <InputField label="Susunan Nama Mempelai" name="susunan_nama_mempelai" placeholder="Pria & Wanita" />
                                <InputField label="Agama" name="agama" placeholder="Hindu / Islam / dll" />
                                <div className="flex items-center gap-3 pt-6">
                                    <input type="checkbox" name="isi_foto" checked={formData.isi_foto} onChange={handleChange} className="w-4 h-4 rounded" />
                                    <label className="text-sm text-gray-700">Isi Foto</label>
                                </div>
                            </div>
                        </div>

                        {/* Mempelai Wanita */}
                        <div>
                            <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3 pb-2 border-b border-pink-100">Mempelai Wanita</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Nama Panggilan" name="nama_panggilan_wanita" placeholder="Nama panggilan" />
                                <InputField label="Nama Lengkap" name="nama_lengkap_wanita" placeholder="Nama lengkap" />
                                <InputField label="Nama Orang Tua" name="nama_ortu_wanita" placeholder="Nama orang tua" />
                                <InputField label="Instagram" name="ig_wanita" placeholder="@username" />
                            </div>
                        </div>

                        {/* Mempelai Pria */}
                        <div>
                            <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3 pb-2 border-b border-pink-100">Mempelai Pria</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Nama Panggilan" name="nama_panggilan_pria" placeholder="Nama panggilan" />
                                <InputField label="Nama Lengkap" name="nama_lengkap_pria" placeholder="Nama lengkap" />
                                <InputField label="Nama Orang Tua" name="nama_ortu_pria" placeholder="Nama orang tua" />
                                <InputField label="Instagram" name="ig_pria" placeholder="@username" />
                            </div>
                        </div>

                        {/* Acara Pernikahan */}
                        <div>
                            <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3 pb-2 border-b border-pink-100">Pernikahan (Akad/Pemberkatan)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Tanggal Pernikahan" name="tanggal_pernikahan" type="date" />
                                <InputField label="Waktu Pernikahan" name="waktu_pernikahan" placeholder="08:00 - 12:00 WITA" />
                                <InputField label="Alamat Pernikahan" name="alamat_pernikahan" placeholder="Alamat lengkap" />
                                <InputField label="Link Lokasi" name="link_lokasi_pernikahan" placeholder="https://maps.google.com/..." />
                            </div>
                        </div>

                        {/* Resepsi */}
                        <div>
                            <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3 pb-2 border-b border-pink-100">Resepsi</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Tanggal Resepsi" name="tanggal_resepsi" type="date" />
                                <InputField label="Waktu Resepsi" name="waktu_resepsi" placeholder="18:00 - 21:00 WITA" />
                                <InputField label="Alamat Resepsi" name="alamat_resepsi" placeholder="Alamat lengkap" />
                                <InputField label="Link Lokasi Resepsi" name="link_lokasi_resepsi" placeholder="https://maps.google.com/..." />
                            </div>
                        </div>

                        {/* Additional */}
                        <div>
                            <h3 className="text-sm font-bold text-pink-600 uppercase tracking-wider mb-3 pb-2 border-b border-pink-100">Tambahan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" name="amplop_digital" checked={formData.amplop_digital} onChange={handleChange} className="w-4 h-4 rounded" />
                                    <label className="text-sm text-gray-700">Amplop Digital</label>
                                </div>
                                <InputField label="No. Rekening" name="no_rek" placeholder="No. Rekening" />
                                <InputField label="Link Drive Foto" name="link_drive_foto" placeholder="https://drive.google.com/..." />
                                <InputField label="Lagu / Backsound" name="lagu" placeholder="Judul lagu atau link" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                                Batal
                            </button>
                            <button type="submit" disabled={submitting} className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 font-bold disabled:opacity-50">
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
                    <p className="text-gray-500">Belum ada pesanan pernikahan.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-pink-50 text-pink-700 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Pemesan</th>
                                    <th className="px-6 py-4">Mempelai</th>
                                    <th className="px-6 py-4">Tgl Nikah</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-pink-50/10 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.nama_pemesan}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {order.nama_panggilan_pria || '-'} & {order.nama_panggilan_wanita || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {order.tanggal_pernikahan ? new Date(order.tanggal_pernikahan).toLocaleDateString('id-ID', {
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
                                                className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
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
