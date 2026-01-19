import Head from 'next/head';
import Navbar from '@/components/Navbar';
import ThemePortfolio from '@/components/ThemePortfolio';
import Footer from '@/components/Footer';

const fetchProducts = async () => {
    try {
        const response = await apiAdmin.getProducts();
        setProducts(response.data);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to load products');
    } finally {
        setLoading(false);
    }
};

export default function UndanganPage() {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>Katalog Undangan | Sinvitation</title>
                <meta name="description" content="Pilih berbagai desain undangan pernikahan digital eksklusif dari Sinvitation." />
            </Head>

            <Navbar />

            <main className="pt-20">
                <ThemePortfolio />
            </main>

            <Footer />
        </div>
    );
}
