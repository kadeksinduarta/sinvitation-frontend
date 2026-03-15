import "@/styles/globals.css";
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import MaintenanceBanner from '@/components/MaintenanceBanner';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const isHomePage = router.pathname === '/';

    return (
        <>
            {isHomePage && <MaintenanceBanner />}
            <Component {...pageProps} />
            <Toaster position="top-center" />
        </>
    );
}
