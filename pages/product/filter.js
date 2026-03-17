import Head from 'next/head';
import Navbar from '@/components/Navbar';
import FilterDemo from '@/components/FilterDemo';
import Footer from '@/components/Footer';

export default function FilterPage() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Filter Instagram Premium untuk Pernikahan | SInvitation</title>
                <meta name="description" content="Koleksi filter Instagram premium untuk pernikahan dan event spesial dari SInvitation. Download gratis dengan pemesanan undangan digital!" />
                <meta name="keywords" content="filter instagram pernikahan, filter IG wedding, filter instagram premium, filter instagram gratis, SInvitation filter" />
                <link rel="canonical" href="https://sinvitation.my.id/product/filter" />

                <meta property="og:title" content="Filter Instagram Premium untuk Pernikahan | SInvitation" />
                <meta property="og:description" content="Koleksi filter Instagram premium untuk pernikahan dan event spesial dari SInvitation." />
                <meta property="og:url" content="https://sinvitation.my.id/product/filter" />
                <meta property="og:image" content="https://sinvitation.my.id/images/Logo-latar.png" />

                <meta name="twitter:title" content="Filter Instagram Premium untuk Pernikahan | SInvitation" />
                <meta name="twitter:description" content="Koleksi filter Instagram premium untuk pernikahan dan event spesial dari SInvitation." />

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
                                    "name": "Filter Instagram",
                                    "item": "https://sinvitation.my.id/product/filter"
                                }
                            ]
                        })
                    }}
                />
            </Head>

            <Navbar />

            <main className="pt-20">
                <FilterDemo />
            </main>

            <Footer />
        </div>
    );
}
