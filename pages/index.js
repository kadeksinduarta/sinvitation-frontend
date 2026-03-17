import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import ThemePortfolio from '@/components/ThemePortfolio';
import FilterDemo from '@/components/FilterDemo';
import Services from '@/components/Services';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SInvitation | Undangan Digital & Filter Instagram Premium</title>
        <meta name="description" content="Undangan digital website pernikahan online premium dengan desain eksklusif dan harga terjangkau. Tersedia undangan pernikahan, ulang tahun, metatah, dan free filter Instagram!" />
        <meta name="keywords" content="undangan digital, undangan pernikahan online, undangan digital premium, filter instagram pernikahan, undangan website, undangan digital murah, undangan digital Bali, SInvitation" />
        <link rel="canonical" href="https://sinvitation.my.id" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SInvitation | Undangan Digital & Filter Instagram Premium" />
        <meta property="og:description" content="Undangan digital website pernikahan online premium dengan desain eksklusif dan harga terjangkau. Dapatkan Free Filter Instagram!" />
        <meta property="og:url" content="https://sinvitation.my.id" />
        <meta property="og:image" content="https://sinvitation.my.id/images/Logo-latar.png" />

        {/* Twitter */}
        <meta name="twitter:title" content="SInvitation | Undangan Digital & Filter Instagram Premium" />
        <meta name="twitter:description" content="Undangan digital website pernikahan online premium dengan desain eksklusif dan harga terjangkau." />

        {/* Breadcrumb Structured Data */}
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
                }
              ]
            })
          }}
        />

        {/* Product Structured Data for Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Undangan Digital Premium",
              "provider": {
                "@type": "Organization",
                "name": "SInvitation",
                "logo": "https://sinvitation.my.id/images/Logo-latar.png"
              },
              "description": "Undangan digital website pernikahan online premium dengan desain eksklusif dan harga terjangkau.",
              "areaServed": {
                "@type": "Country",
                "name": "Indonesia"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Layanan Undangan Digital",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Undangan Pernikahan Digital",
                      "description": "Undangan pernikahan digital premium dengan berbagai tema eksklusif"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Undangan Ulang Tahun Digital",
                      "description": "Undangan ulang tahun digital dengan desain seru dan berwarna"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Undangan Metatah Digital",
                      "description": "Undangan upacara metatah (potong gigi) digital"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Filter Instagram Premium",
                      "description": "Filter Instagram premium untuk pernikahan dan event spesial"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* FAQ Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Apa itu SInvitation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SInvitation adalah layanan undangan digital website premium untuk pernikahan, ulang tahun, dan metatah dengan desain eksklusif dan harga terjangkau."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Berapa harga undangan digital di SInvitation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SInvitation menawarkan berbagai paket undangan digital premium dengan harga terjangkau. Kunjungi halaman pricing kami untuk informasi lengkap."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apakah SInvitation menyediakan filter Instagram?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ya, SInvitation menyediakan filter Instagram premium gratis sebagai bonus untuk setiap pemesanan undangan digital."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <Navbar />

      <main>
        <Hero />
        <Features />
        <Pricing />
        <ThemePortfolio />
        <Services />
        <FilterDemo />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
