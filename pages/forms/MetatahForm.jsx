import React, { useState } from 'react';
import Head from 'next/head';
import { apiClient } from '../../utils/api';
import { Sparkles, User, Users, MapPin, Calendar, Music, Image, Upload, CheckCircle, ArrowLeft, UserPlus, Trash2, PartyPopper } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const initialForm = {
    nama_pemesan: '',
    no_hp: '',
    isi_foto: false,
    link_template: '',
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
    link_drive_foto: '',
    lagu: '',
    catatan: '',
    bukti_tranfer: null,
};

const InputField = ({ label, name, type = 'text', required = false, placeholder = '', icon: Icon, value, onChange }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm transition-all bg-white`}
            />
        </div>
    </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-purple-100">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-purple-600" />
        </div>
        <h3 className="text-sm font-bold text-purple-700 uppercase tracking-wider">{title}</h3>
    </div>
);

export default function MetatahForm() {
    const router = useRouter();
    const [formData, setFormData] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, bukti_tranfer: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    // Peserta handlers
    const addPeserta = () => {
        setFormData(prev => ({
            ...prev,
            data_peserta: [...prev.data_peserta, { nama: '', username_ig: '' }],
        }));
    };

    const removePeserta = (index) => {
        setFormData(prev => ({
            ...prev,
            data_peserta: prev.data_peserta.filter((_, i) => i !== index),
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'bukti_tranfer') {
                    if (formData[key]) data.append(key, formData[key]);
                } else if (key === 'isi_foto') {
                    data.append(key, formData[key] ? '1' : '0');
                } else if (key === 'data_peserta') {
                    data.append(key, JSON.stringify(formData[key]));
                } else if (key === 'data_ortu') {
                    data.append(key, JSON.stringify(formData[key]));
                } else if (key === 'jumlah_peserta') {
                    data.append(key, formData.data_peserta.length.toString());
                } else if (formData[key] !== '' && formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            });

            await apiClient.submitMetatahOrder(data);
            setSubmitted(true);
            toast.success('Pesanan berhasil dikirim!');
        } catch (error) {
            const msg = error.response?.data?.message || 'Gagal mengirim pesanan. Periksa kembali data Anda.';
            toast.error(msg);
            console.error(error.response?.data);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center p-4">
                <Head><title>Pesanan Terkirim | Sinvitation</title></Head>
                <div className="text-center bg-white p-10 rounded-3xl shadow-lg border border-purple-100 max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Terkirim! 🙏</h1>
                    <p className="text-gray-600 mb-6">Terima kasih, pesanan undangan metatah Anda sedang diproses. Tim kami akan segera menghubungi Anda.</p>
                    <button onClick={() => router.push('/')} className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-bold transition-all">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 py-8 px-4">
            <Head><title>Form Pengisian Data Metatah | Sinvitation</title></Head>
            <Toaster position="top-center" />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button onClick={() => router.back()} className="absolute left-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-purple-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Form Data Metatah</h1>
                    <p className="text-gray-500 mt-2">Lengkapi data berikut untuk pembuatan undangan metatah digital Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informasi Pemesan */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={User} title="Informasi Pemesan" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Nama Pemesan" name="nama_pemesan" value={formData.nama_pemesan} onChange={handleChange} required placeholder="Nama lengkap pemesan" icon={User} />
                            <InputField label="No. HP / WhatsApp" name="no_hp" value={formData.no_hp} onChange={handleChange} placeholder="08xxxxxxxxxx" />
                            <InputField label="Link Template" name="link_template" value={formData.link_template} onChange={handleChange} required placeholder="Pilih template dari katalog kami" />
                            <div className="flex items-center gap-3 pt-6">
                                <input type="checkbox" name="isi_foto" checked={formData.isi_foto} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                                <label className="text-sm font-medium text-gray-700">Admin mengisikan foto</label>
                            </div>
                        </div>
                    </div>

                    {/* Detail Orang Tua */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Users} title={`Keluarga / Tuan Rumah (${formData.data_ortu.length})`} />
                        <div className="space-y-3">
                            {formData.data_ortu.map((ortu, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                                    <span className="text-xs font-bold text-purple-400 w-8 shrink-0">#{index + 1}</span>
                                    <div className="flex-1 w-full relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Cth: Bpk. Budi & Ibu Ani (orang tua dari nama peserta metatah)"
                                            value={ortu.nama}
                                            onChange={(e) => updateOrtu(index, e.target.value)}
                                            required
                                            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeOrtu(index)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addOrtu}
                                className="flex items-center gap-2 px-5 py-2.5 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors text-sm font-bold w-full justify-center"
                            >
                                <UserPlus className="w-4 h-4" />
                                Tambah Keluarga / Orang Tua
                            </button>
                        </div>
                    </div>

                    {/* Data Peserta */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={UserPlus} title={`Data Peserta Metatah (${formData.data_peserta.length} Orang)`} />
                        <div className="space-y-3">
                            {formData.data_peserta.map((peserta, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                                    <span className="text-xs font-bold text-purple-400 w-8 shrink-0">#{index + 1}</span>
                                    <div className="flex-1 w-full">
                                        <input
                                            type="text"
                                            placeholder="Nama peserta"
                                            value={peserta.nama}
                                            onChange={(e) => updatePeserta(index, 'nama', e.target.value)}
                                            required
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <input
                                            type="text"
                                            placeholder="@username_ig"
                                            value={peserta.username_ig}
                                            onChange={(e) => updatePeserta(index, 'username_ig', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removePeserta(index)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addPeserta}
                                className="flex items-center gap-2 px-5 py-2.5 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors text-sm font-bold w-full justify-center"
                            >
                                <UserPlus className="w-4 h-4" />
                                Tambah Peserta
                            </button>
                        </div>
                    </div>

                    {/* Detail Acara */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Calendar} title="Detail Acara" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Tanggal Acara" name="tanggal_acara" value={formData.tanggal_acara} onChange={handleChange} type="date" required icon={Calendar} />
                            <InputField label="Waktu Acara" name="waktu_acara" value={formData.waktu_acara} onChange={handleChange} required placeholder="08:00 - 12:00 WITA" />
                            <InputField label="Alamat Acara" name="alamat_acara" value={formData.alamat_acara} onChange={handleChange} required placeholder="Alamat lengkap lokasi" icon={MapPin} />
                            <InputField label="Link Google Maps" name="link_lokasi_acara" value={formData.link_lokasi_acara} onChange={handleChange} required placeholder="https://maps.google.com/..." />
                        </div>
                    </div>

                    {/* Resepsi */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={PartyPopper} title="Resepsi (Opsional)" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Tanggal Resepsi" name="tanggal_resepsi" value={formData.tanggal_resepsi} onChange={handleChange} type="date" icon={Calendar} />
                            <InputField label="Waktu Resepsi" name="waktu_resepsi" value={formData.waktu_resepsi} onChange={handleChange} placeholder="18:00 - 21:00 WITA" />
                            <InputField label="Alamat Resepsi" name="alamat_resepsi" value={formData.alamat_resepsi} onChange={handleChange} placeholder="Alamat lengkap lokasi" icon={MapPin} />
                            <InputField label="Link Google Maps" name="link_lokasi_resepsi" value={formData.link_lokasi_resepsi} onChange={handleChange} placeholder="https://maps.google.com/..." />
                        </div>
                    </div>

                    {/* Media & Tambahan */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Music} title="Media & Tambahan" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Link Drive Foto" name="link_drive_foto" value={formData.link_drive_foto} onChange={handleChange} placeholder="https://drive.google.com/..." icon={Image} />
                            <InputField label="Lagu / Backsound" name="lagu" value={formData.lagu} onChange={handleChange} placeholder="Judul lagu atau link YouTube" icon={Music} />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Catatan Tambahan</label>
                            <textarea
                                name="catatan"
                                value={formData.catatan}
                                onChange={handleChange}
                                placeholder="Catatan atau request khusus..."
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm resize-none"
                            />
                        </div>
                    </div>

                    {/* Bukti Transfer */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Upload} title="Bukti Transfer" />
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-300 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="bukti_tranfer"
                                required
                            />
                            <label htmlFor="bukti_tranfer" className="cursor-pointer">
                                {preview ? (
                                    <div>
                                        <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-3" />
                                        <p className="text-sm text-purple-600 font-medium">Klik untuk ganti foto</p>
                                    </div>
                                ) : (
                                    <div>
                                        <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                        <p className="text-sm text-gray-500 font-medium">Klik untuk upload bukti transfer</p>
                                        <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG (Maks. 2MB)</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl hover:from-purple-700 hover:to-violet-700 font-bold text-lg shadow-lg shadow-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <span className="flex items-center justify-center gap-3">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Mengirim Pesanan...
                            </span>
                        ) : 'Kirim Pesanan Metatah'}
                    </button>
                </form>

                <footer className="mt-8 text-center text-gray-400 text-xs pb-8">
                    &copy; {new Date().getFullYear()} Sinvitation — Digital Invitation
                </footer>
            </div>
        </div>
    );
}
