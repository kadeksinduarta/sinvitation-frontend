import Head from 'next/head';
import Navbar from '@/components/Navbar';
import ThemePortfolio from '@/components/ThemePortfolio';
import Footer from '@/components/Footer';

export default function UndanganPage() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Katalog Undangan Digital Premium | SInvitation</title>
                <meta name="description" content="Pilih berbagai desain undangan pernikahan digital eksklusif dari SInvitation. Tersedia tema elegant, modern, minimalis, dan tradisional dengan harga terjangkau." />
                <meta name="keywords" content="katalog undangan digital, desain undangan pernikahan, tema undangan digital, undangan pernikahan premium, undangan online" />
                <link rel="canonical" href="https://sinvitation.my.id/product/undangan" />

                <meta property="og:title" content="Katalog Undangan Digital Premium | SInvitation" />
                <meta property="og:description" content="Pilih berbagai desain undangan pernikahan digital eksklusif dari SInvitation." />
                <meta property="og:url" content="https://sinvitation.my.id/product/undangan" />
                <meta property="og:image" content="https://sinvitation.my.id/images/Logo-latar.png" />

                <meta name="twitter:title" content="Katalog Undangan Digital Premium | SInvitation" />
                <meta name="twitter:description" content="Pilih berbagai desain undangan pernikahan digital eksklusif dari SInvitation." />

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
                                    "name": "Katalog Undangan",
                                    "item": "https://sinvitation.my.id/product/undangan"
                                }
                            ]
                        })
                    }}
                />
            </Head>

            <Navbar />

            <main className="pt-20">
                <ThemePortfolio />
            </main>

            <Footer />
        </div>
    );
}
