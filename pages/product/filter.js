import Head from 'next/head';
import Navbar from '@/components/Navbar';
import FilterDemo from '@/components/FilterDemo';
import Footer from '@/components/Footer';

export default function FilterPage() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Katalog Filter Instagram | Sinvitation</title>
                <meta name="description" content="Koleksi filter Instagram premium untuk pernikahan dan event dari Sinvitation." />
            </Head>

            <Navbar />

            <main className="pt-20">
                <FilterDemo />
            </main>

            <Footer />
        </div>
    );
}
