import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Copy, CheckCircle2, MessageCircle, Send, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KirimUndangan() {
  const [linkUndangan, setLinkUndangan] = useState('');
  const [namaTamu, setNamaTamu] = useState('');
  const [tipeAcara, setTipeAcara] = useState('pernikahan');
  const [copied, setCopied] = useState(false);

  const formatLink = () => {
    if (!linkUndangan || !namaTamu) return '';

    // Membersihkan spasi di awal dan akhir input
    let cleanLink = linkUndangan.trim();

    // Hapus SEMUA garis miring (/) yang ada di akhir URL untuk membersihkan input yang berantakan msl: "///"
    while (cleanLink.endsWith('/')) {
      cleanLink = cleanLink.slice(0, -1);
    }

    // Karena sistem membutuhkan 1 garis miring (/) agar undangan terbaca benar, kita tambahkan satu ke URL bersih
    // (Pengecekan ini dihindari jika ternyata client menginput URL yang langsung berisi tanda '?' di dalamnya)
    if (!cleanLink.includes('?')) {
      cleanLink += '/';
    }

    const formattedName = namaTamu.trim().replace(/\s+/g, '+');
    const separator = cleanLink.includes('?') ? '&' : '?';
    return `${cleanLink}${separator}untuk=${formattedName}`;
  };

  const generateMessage = () => {
    const finalLink = formatLink();
    const nama = namaTamu.trim() || '[Nama Tamu]';
    const link = finalLink || '[Link Undangan Anda]?untuk=[Nama Tamu]';

    switch (tipeAcara) {
      case 'pernikahan':
        return `Om Swastyastu ${nama},\nDengan penuh kebahagiaan kami mengundang Anda untuk hadir dan memberikan doa restu pada acara pernikahan kami. Silakan membuka undangan digital melalui link berikut:\n\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk merayakan hari istimewa kami. Terima kasih atas doa dan restu yang diberikan.`;
      case 'metatah':
        return `Om Swastyastu,\nDengan hormat kami mengundang ${nama} untuk hadir pada acara Upacara Metatah (Potong Gigi) yang akan kami selenggarakan. Informasi lengkap mengenai acara dapat dilihat melalui undangan digital pada link berikut:\n\n${link}\n\nMerupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i dapat berkenan hadir serta memberikan doa restu dalam acara tersebut. Atas kehadiran dan doa restunya kami ucapkan terima kasih.`;
      case 'ulang_tahun':
        return `Halo ${nama},\nKami dengan senang hati mengundang Anda untuk merayakan acara ulang tahun yang akan diselenggarakan dalam waktu dekat. Detail acara dapat dilihat melalui undangan digital pada link berikut:\n\n${link}\n\nKami sangat berharap Anda dapat hadir untuk merayakan momen spesial ini bersama kami. Terima kasih dan sampai jumpa di acara tersebut.`;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    if (!namaTamu || !linkUndangan) {
      alert('Silakan lengkapi Link Undangan dan Nama Tamu terlebih dahulu!');
      return;
    }
    navigator.clipboard.writeText(generateMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    if (!namaTamu || !linkUndangan) {
      alert('Silakan lengkapi Link Undangan dan Nama Tamu terlebih dahulu!');
      return;
    }
    const message = encodeURIComponent(generateMessage());
    // Use WhatsApp web/app link
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Head>
        <title>Kirim Undangan Digital Personal via WhatsApp | SInvitation</title>
        <meta name="description" content="Kirim undangan digital personal ke WhatsApp tamu Anda dengan satu kali klik. Buat pesan undangan pernikahan, ulang tahun, dan metatah yang rapi dan personal." />
        <meta name="keywords" content="kirim undangan digital, kirim undangan whatsapp, undangan personal, share undangan digital, SInvitation kirim" />
        <link rel="canonical" href="https://sinvitation.my.id/kirim-undangan" />

        <meta property="og:title" content="Kirim Undangan Digital Personal via WhatsApp | SInvitation" />
        <meta property="og:description" content="Kirim undangan digital personal ke WhatsApp tamu Anda dengan satu kali klik." />
        <meta property="og:url" content="https://sinvitation.my.id/kirim-undangan" />
        <meta property="og:image" content="https://sinvitation.my.id/images/Logo-latar.png" />

        <meta name="twitter:title" content="Kirim Undangan Digital Personal via WhatsApp | SInvitation" />
        <meta name="twitter:description" content="Kirim undangan digital personal ke WhatsApp tamu Anda dengan satu kali klik." />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://sinvitation.my.id"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Kirim Undangan",
                  "item": "https://sinvitation.my.id/kirim-undangan"
                }
              ]
            })
          }}
        />
      </Head>

      <Navbar />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-extrabold text-elegant-dark mb-4 tracking-tight"
            >
              Kirim Undangan Personal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Buat pesan undangan yang rapi dan personal untuk dibagikan ke WhatsApp tamu Anda dengan satu kali klik.
            </motion.p>
          </div>

          {/* Step by Step Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 bg-blue-50/50 border border-blue-100 rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-elegant-dark mb-5 flex items-center justify-center md:justify-start gap-2">
              <Info className="w-5 h-5 text-primary" />
              Cara Penggunaan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-50 transition-all hover:shadow-md hover:border-blue-100">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-soft-blue text-primary font-bold mb-3">1</span>
                <p className="text-[15px] font-bold text-elegant-dark mb-1">Link Undangan</p>
                <p className="text-sm text-gray-600 leading-relaxed">Masukkan link utama undangan digital Anda</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-50 transition-all hover:shadow-md hover:border-blue-100">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-soft-blue text-primary font-bold mb-3">2</span>
                <p className="text-[15px] font-bold text-elegant-dark mb-1">Nama Tamu</p>
                <p className="text-sm text-gray-600 leading-relaxed">Ketik nama tamu. Sistem akan otomatis mengatur spasinya</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-50 transition-all hover:shadow-md hover:border-blue-100">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-soft-blue text-primary font-bold mb-3">3</span>
                <p className="text-[15px] font-bold text-elegant-dark mb-1">Pilih Acara</p>
                <p className="text-sm text-gray-600 leading-relaxed">Pilih event agar teks menyesuaikan format acara</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-50 transition-all hover:shadow-md hover:border-blue-100">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-soft-blue text-primary font-bold mb-3">4</span>
                <p className="text-[15px] font-bold text-elegant-dark mb-1">Kirim / Salin</p>
                <p className="text-sm text-gray-600 leading-relaxed">Klik Buka WhatsApp untuk langsung mengirim ke kontak tujuan</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="premium-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Left Side: Form */}
            <div className="lg:col-span-5 border-r border-border-subtle bg-white p-6 sm:p-8 flex flex-col gap-6">

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-soft-blue text-primary flex items-center justify-center text-xs">1</span>
                  Link Undangan Anda
                </label>
                <input
                  type="url"
                  placeholder="https://sinvitation.com/nama-kalian"
                  value={linkUndangan}
                  onChange={(e) => setLinkUndangan(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-soft-blue text-primary flex items-center justify-center text-xs">2</span>
                  Nama Tamu
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bapak Sindu"
                  value={namaTamu}
                  onChange={(e) => setNamaTamu(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-soft-blue text-primary flex items-center justify-center text-xs">3</span>
                  Pilih Acara
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {['pernikahan', 'metatah', 'ulang_tahun'].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${tipeAcara === type ? 'border-primary bg-soft-blue' : 'border-gray-200 hover:border-accent'}`}
                    >
                      <input
                        type="radio"
                        name="tipeAcara"
                        value={type}
                        checked={tipeAcara === type}
                        onChange={() => setTipeAcara(type)}
                        className="hidden"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${tipeAcara === type ? 'border-primary' : 'border-gray-300'}`}>
                        {tipeAcara === type && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="font-medium text-gray-800">
                        {type === 'pernikahan' ? 'Pernikahan' : type === 'metatah' ? 'Metatah (Potong Gigi)' : 'Ulang Tahun'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>



            </div>

            {/* Right Side: Preview & Actions */}
            <div className="lg:col-span-7 bg-soft-blue/30 p-6 sm:p-8 flex flex-col h-full">
              <div className="flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-elegant-dark flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Preview Chat WhatsApp
                  </h3>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-border-subtle p-5 sm:p-6 flex-grow relative overflow-hidden">
                  {/* Visual WhatsApp Bubble like */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10" />

                  <div className="relative z-10 font-sans text-[15px] leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {generateMessage()}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all ${copied
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                      : 'bg-white border-2 border-primary text-primary hover:bg-soft-blue'
                      }`}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Tersalin!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Copy className="w-5 h-5" />
                          <span>Salin Teks</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5" />
                    Buka WhatsApp
                  </button>
                </div>
              </div>
            </div >

          </motion.div >
        </div >
      </main >

      <Footer />
    </div >
  );
}
