import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import ThemePortfolio from '@/components/ThemePortfolio';
import FilterDemo from '@/components/FilterDemo';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SInvitation | Undangan Digital & Filter Instagram Premium</title>
        <meta name="description" content="Undangan digital website pernikahan online premium dengan desain eksklusif dan harga terjangkau. Dapatkan Free Filter Instagram!" />
        <meta property="og:title" content="Sinvitation" />
        <meta property="og:description" content="Undangan digital website pernikahan online premium dengan desain undangan pernikahan eksklusif dengan harga yang sangat terjangkau." />
        <meta property="og:image" content="/images/logo.png" />
      </Head>

      <Navbar />

      <main>
        <Hero />
        <Features />
        <Pricing />
        <ThemePortfolio />
        <FilterDemo />
      </main>

      <Footer />
    </div>
  );
}

