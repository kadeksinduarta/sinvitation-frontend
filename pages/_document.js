import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Favicon - menggunakan Logo-latar.png */}
        <link rel="icon" type="image/png" sizes="192x192" href="/images/Logo-latar.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Logo-latar.png" />
        <link rel="shortcut icon" href="/images/Logo-latar.png" />

        {/* Google Fonts - Inter for modern typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

        {/* Global Meta Tags */}
        <meta name="theme-color" content="#8B4513" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="SInvitation" />
        <meta name="publisher" content="SInvitation" />
        <meta property="og:site_name" content="SInvitation" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:image" content="https://sinvitation.my.id/images/Logo-latar.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://sinvitation.my.id/images/Logo-latar.png" />

        {/* Structured Data - Organization (Logo di Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SInvitation",
              "alternateName": "Sinvitation Digital Invitation",
              "url": "https://sinvitation.my.id",
              "logo": "https://sinvitation.my.id/images/Logo-latar.png",
              "image": "https://sinvitation.my.id/images/Logo-latar.png",
              "description": "Undangan digital website pernikahan online premium dengan desain eksklusif dan harga terjangkau. Dapatkan Free Filter Instagram!",
              "sameAs": [
                "https://www.instagram.com/sinvitation",
                "https://api.whatsapp.com/send?phone=+6283115998178"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-831-1599-8178",
                "contactType": "customer service",
                "availableLanguage": ["Indonesian", "English"]
              }
            })
          }}
        />

        {/* Structured Data - WebSite (Search Box di Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SInvitation",
              "alternateName": "Sinvitation - Undangan Digital Premium",
              "url": "https://sinvitation.my.id",
              "description": "Undangan digital website pernikahan online premium dengan desain eksklusif dan harga terjangkau.",
              "publisher": {
                "@type": "Organization",
                "name": "SInvitation",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://sinvitation.my.id/images/Logo-latar.png"
                }
              }
            })
          }}
        />

        {/* Structured Data - SiteNavigationElement (Sitelinks di Google seperti Undiksha) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "SiteNavigationElement",
                  "position": 1,
                  "name": "Katalog Undangan",
                  "description": "Pilih berbagai desain undangan pernikahan digital eksklusif dari SInvitation",
                  "url": "https://sinvitation.my.id/product/undangan"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 2,
                  "name": "Filter Instagram",
                  "description": "Koleksi filter Instagram premium untuk pernikahan dan event dari SInvitation",
                  "url": "https://sinvitation.my.id/product/filter"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 3,
                  "name": "Form Pemesanan",
                  "description": "Pesan undangan digital - Wedding, Birthday, dan Metatah dengan mudah",
                  "url": "https://sinvitation.my.id/forms"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 4,
                  "name": "Kirim Undangan",
                  "description": "Kirim undangan digital personal ke WhatsApp tamu Anda dengan satu kali klik",
                  "url": "https://sinvitation.my.id/kirim-undangan"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 5,
                  "name": "About",
                  "description": "Profil SInvitation - Platform undangan digital premium berbasis di Bali, Indonesia",
                  "url": "https://sinvitation.my.id/about"
                }
              ]
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
