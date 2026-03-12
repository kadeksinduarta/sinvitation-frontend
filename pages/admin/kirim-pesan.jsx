import React, { useState } from 'react';
import Layout from '../../components/admin/Layout';
import { Copy, CheckCircle2, MessageSquare, Link as LinkIcon } from 'lucide-react';

export default function PesanKlien() {
    const [namaKlien, setNamaKlien] = useState('');
    const [linkUndangan, setLinkUndangan] = useState('');
    const [copied, setCopied] = useState(false);

    // Fungsi untuk memformat link undangan bersih (menghilangkan trailing slash)
    const getCleanLink = () => {
        let clean = linkUndangan.trim();
        while (clean.endsWith('/')) {
            clean = clean.slice(0, -1);
        }
        return clean;
    };

    // Fungsi untuk mendapatkan base domain URL (misal: https://pure.sinvitation.my.id)
    const getBaseUrl = () => {
        try {
            const url = new URL(getCleanLink());
            return url.origin;
        } catch (e) {
            return '';
        }
    };

    // Fungsi untuk mendapatkan slug undangan (untuk attendance)
    const getSlug = () => {
        try {
            const url = new URL(getCleanLink());
            const pathes = url.pathname.split('/').filter(p => p);
            return pathes[pathes.length - 1] || '';
        } catch (e) {
            return '';
        }
    };

    const generateRsvpLink = () => {
        const slug = getSlug();
        if (!slug) return '[Link RSVP Akan Muncul Disini]';
        return `https://www.sinvitation.my.id/client/attendance/${slug}`;
    };

    const generatePanduanLink = () => {
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://www.sinvitation.my.id';
        return `${origin}/kirim-undangan`;
    };

    const generateMessage = () => {
        const nama = namaKlien.trim() || '[Nama Klien]';
        
        let linkUtama = linkUndangan.trim() || '[Link Undangan Utama]';
        if (linkUtama !== '[Link Undangan Utama]') {
            // Memastikan link utama bersih dari slash dobel, tapi diakhiri dengan tepat 1 slash
            while (linkUtama.endsWith('/')) {
                linkUtama = linkUtama.slice(0, -1);
            }
            linkUtama += '/';
        }

        const linkRsvp = generateRsvpLink();
        const linkPanduan = generatePanduanLink();

        return `Halo Kak ${nama},

Terima kasih banyak telah mempercayakan pembuatan undangan digitalnya kepada SInvitation! ✨

Kami mengucapkan selamat atas acara yang akan segera diselenggarakan. Kami turut berbahagia dan senang rasanya bisa ikut serta mengabadikan dan memeriahkan momen istimewa Kakak.

Berikut adalah beberapa link penting terkait undangan digital Kakak:

*1. Link Undangan Utama*
🔗 ${linkUtama}
(Ini adalah link utama undangan digital Kakak yang bisa langsung dibagikan kepada keluarga, kerabat, dan teman-teman.)

*2. Link Konfirmasi Kehadiran (RSVP) & Ucapan*
🔗 ${linkRsvp}
(Melalui link ini, Kakak bisa memantau siapa saja tamu yang sudah konfirmasi hadir (RSVP) beserta daftar ucapan dan doa yang mereka kirimkan.)

*3. Link Panduan Mengisi Nama Tamu*
🔗 ${linkPanduan}
(Agar undangan terasa lebih personal saat dikirimkan, Kakak bisa menggunakan link ini. Cukup masukkan nama tamu, dan teks pesan WhatsApp beserta link khusus untuk tamu tersebut akan otomatis terbuat.)

Apabila ada kendala atau pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami ya Kak.

Sekali lagi, terima kasih banyak dan semoga seluruh rangkaian acaranya berjalan dengan lancar! 🙏`;
    };

    const handleCopy = () => {
        if (!linkUndangan || !namaKlien) {
            alert('Mohon isi Nama Klien dan Link Undangan terlebih dahulu.');
            return;
        }
        navigator.clipboard.writeText(generateMessage());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Format Pesan ke Klien</h1>
                <p className="text-gray-600">Generator teks serah terima undangan kepada klien.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Input Group */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-blue-500" />
                            Data Undangan Klien
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Klien</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Romeo & Juliet"
                                    value={namaKlien}
                                    onChange={(e) => setNamaKlien(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Link Undangan Utama (URL Penuh)
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://pure.sinvitation.my.id/romeo-juliet"
                                    value={linkUndangan}
                                    onChange={(e) => setLinkUndangan(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">Masukkan URL lengkap. Sistem akan otomatis mengekstrak domain dan slug-nya.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                        <h3 className="text-sm font-bold text-blue-800 mb-2">Informasi Link yang Digenerate:</h3>
                        <ul className="text-xs text-blue-600 space-y-2 list-disc pl-4">
                            <li><strong>Link Utama:</strong> Sama seperti yang Anda inputkan (otomatis memiliki akhiran <code>/</code>).</li>
                            <li><strong>Link RSVP:</strong> Otomatis mengekstrak slug dan ditempel pada domain <code>https://www.sinvitation.my.id/client/attendance/...</code>.</li>
                            <li><strong>Link Panduan:</strong> Otomatis menyesuaikan dengan alamat website (domain) yang sedang Anda buka saat ini (misal di lokal akan jadi localhost).</li>
                        </ul>
                    </div>
                </div>

                {/* Preview and Action Group */}
                <div className="lg:col-span-7">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-green-500" />
                                Hasil Pesan
                            </h2>
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                                    copied 
                                    ? 'bg-green-100 text-green-700 border border-green-200' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Tersalin!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy Pesan & Link
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex-grow font-sans text-sm leading-relaxed text-gray-700 whitespace-pre-wrap overflow-y-auto max-h-[500px]">
                            {generateMessage()}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
