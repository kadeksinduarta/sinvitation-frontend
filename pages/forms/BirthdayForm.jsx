import React, { useState } from 'react';
import Head from 'next/head';
import { apiClient } from '../../utils/api';
import { Cake, User, MapPin, Calendar, Music, Image, Upload, CheckCircle, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const initialForm = {
    nama_pemesan: '',
    no_hp: '',
    isi_foto: false,
    link_template: '',
    nama_yang_ulang_tahun: '',
    ultah_ke: '',
    tanggal_acara: '',
    waktu_acara: '',
    alamat_acara: '',
    link_lokasi_acara: '',
    link_drive_foto: '',
    lagu: '',
    catatan: '',
    bukti_tranfer: null,
};

export default function BirthdayForm() {
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
                } else if (formData[key] !== '' && formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            });

            await apiClient.submitBirthdayOrder(data);
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
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
                <Head><title>Pesanan Terkirim | Sinvitation</title></Head>
                <div className="text-center bg-white p-10 rounded-3xl shadow-lg border border-orange-100 max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Terkirim! 🎂</h1>
                    <p className="text-gray-600 mb-6">Terima kasih, pesanan undangan ulang tahun Anda sedang diproses. Tim kami akan segera menghubungi Anda.</p>
                    <button onClick={() => router.push('/')} className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-bold transition-all">
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        );
    }

    const InputField = ({ label, name, type = 'text', required = false, placeholder = '', icon: Icon }) => (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm transition-all bg-white`}
                />
            </div>
        </div>
    );

    const SectionTitle = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="text-sm font-bold text-orange-700 uppercase tracking-wider">{title}</h3>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-8 px-4">
            <Head><title>Form Pengisian Data Birthday | Sinvitation</title></Head>
            <Toaster position="top-center" />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button onClick={() => router.back()} className="absolute left-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Cake className="w-8 h-8 text-orange-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Form Data Ulang Tahun</h1>
                    <p className="text-gray-500 mt-2">Lengkapi data berikut untuk pembuatan undangan ulang tahun digital Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informasi Pemesan */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={User} title="Informasi Pemesan" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Nama Pemesan" name="nama_pemesan" required placeholder="Nama lengkap pemesan" icon={User} />
                            <InputField label="No. HP / WhatsApp" name="no_hp" required placeholder="08xxxxxxxxxx" />
                            <InputField label="Link Template" name="link_template" required placeholder="Pilih template dari katalog kami" />
                            <div className="flex items-center gap-3 pt-6">
                                <input type="checkbox" name="isi_foto" checked={formData.isi_foto} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                <label className="text-sm font-medium text-gray-700">Admin mengisikan foto</label>
                            </div>
                        </div>
                    </div>

                    {/* Detail Ulang Tahun */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Cake} title="Detail Ulang Tahun" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Nama Yang Ulang Tahun" name="nama_yang_ulang_tahun" required placeholder="Nama yang berulang tahun" />
                            <InputField label="Ultah Ke-" name="ultah_ke" required placeholder="Contoh: 17" />
                        </div>
                    </div>

                    {/* Detail Acara */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Calendar} title="Detail Acara" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Tanggal Acara" name="tanggal_acara" type="date" required icon={Calendar} />
                            <InputField label="Waktu Acara" name="waktu_acara" required placeholder="18:00 - 21:00 WITA" />
                            <InputField label="Alamat Acara" name="alamat_acara" required placeholder="Alamat lengkap lokasi" icon={MapPin} />
                            <InputField label="Link Google Maps" name="link_lokasi_acara" required placeholder="https://maps.google.com/..." />
                        </div>
                    </div>

                    {/* Media & Tambahan */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Music} title="Media & Tambahan" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField label="Link Drive Foto" name="link_drive_foto" placeholder="https://drive.google.com/..." icon={Image} />
                            <InputField label="Lagu / Backsound" name="lagu" placeholder="Judul lagu atau link YouTube" icon={Music} />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Catatan Tambahan</label>
                            <textarea
                                name="catatan"
                                value={formData.catatan}
                                onChange={handleChange}
                                placeholder="Catatan atau request khusus..."
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-sm resize-none"
                            />
                        </div>
                    </div>

                    {/* Bukti Transfer */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionTitle icon={Upload} title="Bukti Transfer" />
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-orange-300 transition-colors">
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
                                        <p className="text-sm text-orange-600 font-medium">Klik untuk ganti foto</p>
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
                        className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl hover:from-orange-700 hover:to-amber-700 font-bold text-lg shadow-lg shadow-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <span className="flex items-center justify-center gap-3">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Mengirim Pesanan...
                            </span>
                        ) : 'Kirim Pesanan Birthday'}
                    </button>
                </form>

                <footer className="mt-8 text-center text-gray-400 text-xs pb-8">
                    &copy; {new Date().getFullYear()} Sinvitation — Digital Invitation
                </footer>
            </div>
        </div>
    );
}
