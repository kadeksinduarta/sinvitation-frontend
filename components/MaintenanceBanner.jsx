import { useState, useEffect } from 'react';
import { X, Wrench } from 'lucide-react';

export default function MaintenanceBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show popup after a short delay for a smoother entrance
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <>
            {/* Backdrop overlay */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity duration-300"
                onClick={() => setVisible(false)}
            />

            {/* Popup card */}
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="pointer-events-auto relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-pop-in"
                >
                    {/* Close button */}
                    <button
                        onClick={() => setVisible(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors z-10"
                        aria-label="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Top gradient bar */}
                    <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />

                    <div className="p-6 sm:p-8 text-center">
                        {/* Icon */}
                        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shadow-inner">
                            <Wrench className="w-8 h-8 text-orange-500 animate-slow-spin" />
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                            🚧 Website Sedang Dalam Perbaikan
                        </h2>

                        {/* Message */}
                        <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                            Kami sedang melakukan pembaruan dan peningkatan pada website ini untuk memberikan layanan yang lebih baik.
                        </p>

                        {/* Reassurance box */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
                            <p className="text-green-700 font-semibold text-sm sm:text-base">
                                ✅ Tidak berpengaruh terhadap undangan yang akan Anda buat
                            </p>
                            <p className="text-green-600 text-xs sm:text-sm mt-1">
                                Proses pemesanan undangan digital tetap berjalan normal seperti biasa.
                            </p>
                        </div>

                        {/* CTA button */}
                        <button
                            onClick={() => setVisible(false)}
                            className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
                        >
                            Saya Mengerti
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes pop-in {
                    0% { opacity: 0; transform: scale(0.85) translateY(20px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-pop-in {
                    animation: pop-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes slow-spin {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(20deg); }
                    75% { transform: rotate(-20deg); }
                    100% { transform: rotate(0deg); }
                }
                .animate-slow-spin {
                    animation: slow-spin 2s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
