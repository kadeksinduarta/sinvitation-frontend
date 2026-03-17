import React, { useState, useEffect } from 'react';
import Layout from '../../components/admin/Layout';
import OrderModal from '../../components/admin/OrderModal';
import { apiAdmin } from '../../utils/api';
import { Search, Eye, Plus, X, UserPlus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const initialMetatahForm = {
    nama_pemesan: '',
    no_hp: '',
    isi_foto: false,
    link_template: '',
    link_drive_foto: '',
    lagu: '',
    catatan: '',
    detail_nama_ortu: '',
    data_ortu: [{ nama: '' }],
    jumlah_peserta: '',
    data_peserta: [],
    tanggal_acara: '',
    waktu_acara: '',
    alamat_acara: '',
    link_lokasi_acara: '',
    tanggal_resepsi: '',
    waktu_resepsi: '',
    alamat_resepsi: '',
    link_lokasi_resepsi: '',
};

export default function AdminMetatah() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(initialMetatahForm);
    const [submitting, setSubmitting] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await apiAdmin.getOrders();
            setOrders(response.data.metatah || []);
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

    // Peserta handlers
    const addPeserta = () => {
        setFormData(prev => ({
            ...prev,
            data_peserta: [...prev.data_peserta, { nama: '', username_ig: '' }],
            jumlah_peserta: prev.data_peserta.length + 1
        }));
    };

    const removePeserta = (index) => {
        setFormData(prev => ({
            ...prev,
            data_peserta: prev.data_peserta.filter((_, i) => i !== index),
            jumlah_peserta: prev.data_peserta.length - 1
        }));
    };

    const updatePeserta = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            data_peserta: prev.data_peserta.map((p, i) => i === index ? { ...p, [field]: value } : p)
        }));
    };

    // Ortu handlers
    const addOrtu = () => {
        setFormData(prev => ({
            ...prev,
            data_ortu: [...prev.data_ortu, { nama: '' }],
        }));
    };

    const removeOrtu = (index) => {
        setFormData(prev => ({
            ...prev,
            data_ortu: prev.data_ortu.filter((_, i) => i !== index),
        }));
    };

    const updateOrtu = (index, value) => {
        setFormData(prev => ({
            ...prev,
            data_ortu: prev.data_ortu.map((p, i) => i === index ? { ...p, nama: value } : p)
        }));
    };

    const handleEdit = (order) => {
        let parsedOrtu = [{ nama: '' }];
        let parsedPeserta = [];
        
        try { if(order.data_ortu && typeof order.data_ortu === 'string') parsedOrtu = JSON.parse(order.data_ortu); else if (Array.isArray(order.data_ortu)) parsedOrtu = order.data_ortu; } catch(e){}
        try { if(order.data_peserta && typeof order.data_peserta === 'string') parsedPeserta = JSON.parse(order.data_peserta); else if (Array.isArray(order.data_peserta)) parsedPeserta = order.data_peserta; } catch(e){}

        setFormData({
            ...order,
            isi_foto: order.isi_foto === 1 || order.isi_foto === true,
            data_ortu: parsedOrtu.length > 0 ? parsedOrtu : [{ nama: '' }],
            data_peserta: parsedPeserta,
            jumlah_peserta: parsedPeserta.length || order.jumlah_peserta || 0,
        });
        setEditingId(order.id);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) return;
        
        try {
            await apiAdmin.deleteOrder('metatah', id);
            toast.success('Pesanan berhasil dihapus');
            fetchOrders();
        } catch (error) {
            console.error('Failed to delete order:', error);
            toast.error('Gagal menghapus pesanan');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const submitData = {
                ...formData,
                jumlah_peserta: formData.data_peserta.length || formData.jumlah_peserta,
                data_peserta: JSON.stringify(formData.data_peserta),
                data_ortu: JSON.stringify(formData.data_ortu),
            };
            
            if (editingId) {
                await apiAdmin.updateOrder('metatah', editingId, submitData);
                toast.success('Data metatah berhasil diperbarui!');
            } else {
                await apiAdmin.createMetatahOrder(submitData);
                toast.success('Data metatah berhasil disimpan!');
            }
            
            setFormData(initialMetatahForm);
            setIsAdding(false);
            setEditingId(null);
            fetchOrders();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal menyimpan data');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredOrders = orders.filter(order =>
        (order.nama_pemesan || '').toLowerCase().includes(search.toLowerCase())
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
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
            />
        </div>
    );

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Metatah Orders</h1>
                    <p className="text-gray-600">Kelola pesanan undangan metatah</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Cari pemesan..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                    <button
                        onClick={() => {
                            if (isAdding) {
                                setIsAdding(false);
                                setEditingId(null);
                                setFormData(initialMetatahForm);
                            } else {
                                setIsAdding(true);
                                setEditingId(null);
                                setFormData(initialMetatahForm);
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
                    >
                        {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        {isAdding ? 'Tutup' : 'Tambah Data'}
                    </button>
                </div>
            </div>

            {/* Form Pengisian Data */}
            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 mb-6">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">
                        {editingId ? 'Edit Data Metatah' : 'Form Pengisian Data Metatah'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Info Umum */}
                        <div>
                            <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3 pb-2 border-b border-purple-100">Informasi Umum</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <InputField label="Nama Pemesan" name="nama_pemesan" required placeholder="Nama pemesan" />
                                <InputField label="No. HP" name="no_hp" placeholder="08xxxxxxxxxx" />
                                <InputField label="Link Template" name="link_template" placeholder="https://..." />
                                <div className="flex items-center gap-3 pt-6">
                                    <input type="checkbox" name="isi_foto" checked={formData.isi_foto} onChange={handleChange} className="w-4 h-4 rounded" />
                                    <label className="text-sm text-gray-700">Isi Foto</label>
                                </div>
                            </div>
                        </div>

                        {/* Detail Orang Tua */}
                        <div>
                            <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3 pb-2 border-b border-purple-100">
                                Keluarga / Tuan Rumah ({formData.data_ortu.length})
                            </h3>
                            <div className="space-y-3">
                                {formData.data_ortu.map((ortu, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <span className="text-xs font-bold text-gray-400 w-6 shrink-0">#{index + 1}</span>
                                        <input
                                            type="text"
                                            placeholder="Cth: Keluarga Bpk. Budi & Ibu Ani"
                                            value={ortu.nama}
                                            onChange={(e) => updateOrtu(index, e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeOrtu(index)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addOrtu}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Tambah Keluarga / Orang Tua
                                </button>
                                <div className="mt-4 border-t pt-4 border-purple-100">
                                     <InputField label="Atau Detail Nama Orang Tua (Manual)" name="detail_nama_ortu" placeholder="Nama lengkap orang tua" />
                                </div>
                            </div>
                        </div>

                        {/* Data Peserta */}
                        <div>
                            <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3 pb-2 border-b border-purple-100">
                                Data Peserta Metatah ({formData.data_peserta.length} Orang)
                            </h3>
                            <div className="space-y-3">
                                {formData.data_peserta.map((peserta, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <span className="text-xs font-bold text-gray-400 w-6 shrink-0">#{index + 1}</span>
                                        <input
                                            type="text"
                                            placeholder="Nama peserta"
                                            value={peserta.nama}
                                            onChange={(e) => updatePeserta(index, 'nama', e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="@username_ig"
                                            value={peserta.username_ig}
                                            onChange={(e) => updatePeserta(index, 'username_ig', e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removePeserta(index)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addPeserta}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Tambah Peserta
                                </button>
                            </div>
                        </div>

                        {/* Detail Acara */}
                        <div>
                            <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3 pb-2 border-b border-purple-100">Detail Acara</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Tanggal Acara" name="tanggal_acara" type="date" />
                                <InputField label="Waktu Acara" name="waktu_acara" placeholder="08:00 - 12:00 WITA" />
                                <InputField label="Alamat Acara" name="alamat_acara" placeholder="Alamat lengkap" />
                                <InputField label="Link Lokasi" name="link_lokasi_acara" placeholder="https://maps.google.com/..." />
                            </div>
                        </div>

                        {/* Resepsi */}
                        <div>
                            <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3 pb-2 border-b border-purple-100">Resepsi</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Tanggal Resepsi" name="tanggal_resepsi" type="date" />
                                <InputField label="Waktu Resepsi" name="waktu_resepsi" placeholder="18:00 - 21:00 WITA" />
                                <InputField label="Alamat Resepsi" name="alamat_resepsi" placeholder="Alamat lengkap" />
                                <InputField label="Link Lokasi Resepsi" name="link_lokasi_resepsi" placeholder="https://maps.google.com/..." />
                            </div>
                        </div>

                        {/* Additional */}
                        <div>
                            <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-3 pb-2 border-b border-purple-100">Tambahan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Link Drive Foto" name="link_drive_foto" placeholder="https://drive.google.com/..." />
                                <InputField label="Lagu / Backsound" name="lagu" placeholder="Judul lagu atau link" />
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                                    <textarea
                                        name="catatan"
                                        value={formData.catatan}
                                        onChange={handleChange}
                                        placeholder="Catatan tambahan..."
                                        rows={3}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-sm resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button 
                                type="button" 
                                onClick={() => {
                                    setIsAdding(false);
                                    setEditingId(null);
                                    setFormData(initialMetatahForm);
                                }} 
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                            >
                                Batal
                            </button>
                            <button type="submit" disabled={submitting} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold disabled:opacity-50">
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
                    <p className="text-gray-500">Belum ada pesanan metatah.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-purple-50 text-purple-700 text-xs uppercase font-bold">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Pemesan</th>
                                    <th className="px-6 py-4">Jml Peserta</th>
                                    <th className="px-6 py-4">Tgl Acara</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-purple-50/10 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.nama_pemesan}</td>
                                        <td className="px-6 py-4 text-gray-600 font-bold">{order.jumlah_peserta || 0} Orang</td>
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
                                            <div className="flex justify-center flex-wrap gap-2">
                                                <button
                                                    onClick={() => handleView(order)}
                                                    className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(order)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Data"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(order.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus Data"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
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

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                order={selectedOrder}
                onUpdate={fetchOrders}
            />
        </Layout>
    );
}
