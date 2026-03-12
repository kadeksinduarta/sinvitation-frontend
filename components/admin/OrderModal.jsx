import React, { useState } from 'react';
import { X, Check, Clock, AlertCircle } from 'lucide-react';
import { apiAdmin, getStorageUrl } from '../../utils/api';
import toast from 'react-hot-toast';

export default function OrderModal({ order, isOpen, onClose, onUpdate }) {
    if (!isOpen || !order) return null;

    const [status, setStatus] = useState(order.status);
    const [loading, setLoading] = useState(false);

    // Determine order type
    const isWedding = !!order.nama_panggilan_wanita;
    const isMetatah = !!order.data_peserta; // Check for metatah specific field
    const type = isWedding ? 'wedding' : isMetatah ? 'metatah' : 'birthday';

    const handleStatusUpdate = async (newStatus) => {
        setLoading(true);
        try {
            await apiAdmin.updateOrderStatus(type, order.id, newStatus);
            setStatus(newStatus);
            toast.success(`Status updated to ${newStatus}`);
            onUpdate(); // Refresh parent list
        } catch (error) {
            console.error(error);
            toast.error('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    const DetailRow = ({ label, value, isLink = false }) => (
        <div className="mb-2">
            <span className="text-sm font-medium text-gray-500 block">{label}</span>
            {isLink && value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-800 break-words hover:underline">
                    {value}
                </a>
            ) : (
                <p className="text-sm text-gray-800 font-medium break-words whitespace-pre-wrap">{value || '-'}</p>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Order Details
                            <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${isWedding ? 'bg-pink-100 text-pink-700' :
                                isMetatah ? 'bg-purple-100 text-purple-700' :
                                    'bg-orange-100 text-orange-700'
                                }`}>
                                {isWedding ? 'Wedding' : isMetatah ? 'Metatah' : 'Birthday'}
                            </span>
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Order ID: #{order.id} • Submitted: {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-0 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full">
                        {/* Left Column: Key Info & Status */}
                        <div className="p-6 bg-gray-50 md:border-r border-gray-200 md:col-span-1 space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Status Pesanan</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleStatusUpdate('pending')}
                                        disabled={loading}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all ${status === 'pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 ring-1 ring-yellow-200' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Pending</div>
                                        {status === 'pending' && <Check className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate('processed')}
                                        disabled={loading}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all ${status === 'processed' ? 'bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-200' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center"><AlertCircle className="w-4 h-4 mr-2" /> Processed</div>
                                        {status === 'processed' && <Check className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate('completed')}
                                        disabled={loading}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all ${status === 'completed' ? 'bg-green-50 border-green-200 text-green-700 ring-1 ring-green-200' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center"><Check className="w-4 h-4 mr-2" /> Completed</div>
                                        {status === 'completed' && <Check className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Bukti Transfer</h3>
                                {order.bukti_tranfer ? (
                                    <a href={getStorageUrl(order.bukti_tranfer)} target="_blank" rel="noopener noreferrer" className="block relative group rounded-lg overflow-hidden border">
                                        <img 
                                            src={getStorageUrl(order.bukti_tranfer)} 
                                            alt="Bukti Transfer" 
                                            className="w-full h-32 object-cover bg-gray-100" 
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                                            <span className="text-white opacity-0 group-hover:opacity-100 font-medium text-sm drop-shadow-md">Lihat Full</span>
                                        </div>
                                    </a>
                                ) : <span className="text-gray-500 italic text-sm">Tidak ada bukti transfer</span>}
                            </div>
                        </div>

                        {/* Right Column: Detailed Data */}
                        <div className="p-6 md:col-span-2 space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Informasi Pemesan</h4>
                                    <DetailRow label="Nama Pemesan" value={order.nama_pemesan} />
                                    <DetailRow label="No. HP" value={order.no_hp} />
                                    <DetailRow label="Isi Foto?" value={order.isi_foto ? 'Ya' : 'Tidak'} />
                                    <DetailRow label="Link Template" value={order.link_template} isLink />
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Catatan & Media</h4>
                                    <DetailRow label="Link Drive Foto" value={order.link_drive_foto} isLink />
                                    <DetailRow label="Lagu/Backsound" value={order.lagu} isLink />
                                    <DetailRow label="Catatan Tambahan" value={order.catatan} />
                                </div>
                            </div>

                            {isWedding ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Mempelai Wanita</h4>
                                            <DetailRow label="Nama Lengkap" value={order.nama_lengkap_wanita} />
                                            <DetailRow label="Nama Panggilan" value={order.nama_panggilan_wanita} />
                                            <DetailRow label="Orang Tua" value={order.nama_ortu_wanita} />
                                            <DetailRow label="Instagram" value={order.ig_wanita} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Mempelai Pria</h4>
                                            <DetailRow label="Nama Lengkap" value={order.nama_lengkap_pria} />
                                            <DetailRow label="Nama Panggilan" value={order.nama_panggilan_pria} />
                                            <DetailRow label="Orang Tua" value={order.nama_ortu_pria} />
                                            <DetailRow label="Instagram" value={order.ig_pria} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Acara Akad</h4>
                                            <DetailRow label="Waktu" value={`${order.tanggal_pernikahan} ${order.waktu_pernikahan || ''}`} />
                                            <DetailRow label="Alamat" value={order.alamat_pernikahan} />
                                            <DetailRow label="Lokasi Maps" value={order.link_lokasi_pernikahan} isLink />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Acara Resepsi</h4>
                                            <DetailRow label="Waktu" value={`${order.tanggal_resepsi || '-'} ${order.waktu_resepsi || ''}`} />
                                            <DetailRow label="Alamat" value={order.alamat_resepsi} />
                                            <DetailRow label="Lokasi Maps" value={order.link_lokasi_resepsi} isLink />
                                        </div>
                                    </div>
                                </>
                            ) : isMetatah ? (
                                <>
                                    <div className="md:col-span-2 mb-6">
                                        <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Data Orang Tua</h4>
                                        <DetailRow label="Detail Lengkap" value={order.detail_nama_ortu} />
                                    </div>

                                    <div className="md:col-span-2">
                                        <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Data Peserta Metatah ({order.jumlah_peserta} Orang)</h4>
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                            {Array.isArray(order.data_peserta) && order.data_peserta.map((peserta, idx) => (
                                                <div key={idx} className="mb-3 last:mb-0 border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                                                    <p className="font-semibold text-gray-800 text-sm">Peserta #{idx + 1}</p>
                                                    <div className="grid grid-cols-2 gap-4 mt-1">
                                                        <DetailRow label="Nama" value={peserta.nama} />
                                                        <DetailRow label="Instagram" value={peserta.username_ig} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Detail Acara</h4>
                                            <DetailRow label="Waktu" value={`${order.tanggal_acara} ${order.waktu_acara || ''}`} />
                                            <DetailRow label="Alamat" value={order.alamat_acara} />
                                            <DetailRow label="Lokasi Maps" value={order.link_lokasi_acara} isLink />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Acara Resepsi</h4>
                                            <DetailRow label="Waktu" value={`${order.tanggal_resepsi || '-'} ${order.waktu_resepsi || ''}`} />
                                            <DetailRow label="Alamat" value={order.alamat_resepsi} />
                                            <DetailRow label="Lokasi Maps" value={order.link_lokasi_resepsi} isLink />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Detail Ultah</h4>
                                        <DetailRow label="Nama Yang Ultah" value={order.nama_yang_ulang_tahun} />
                                        <DetailRow label="Ulang Tahun Ke" value={order.ultah_ke} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3 pb-2 border-b">Acara</h4>
                                        <DetailRow label="Waktu" value={`${order.tanggal_acara} ${order.waktu_acara || ''}`} />
                                        <DetailRow label="Alamat" value={order.alamat_acara} />
                                        <DetailRow label="Lokasi Maps" value={order.link_lokasi_acara} isLink />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50 rounded-b-xl flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
