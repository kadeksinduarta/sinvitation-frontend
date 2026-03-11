import "@/styles/globals.css";
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import MaintenanceBanner from '@/components/MaintenanceBanner';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const isAdmin = router.pathname.startsWith('/admin');

    return (
        <>
            {!isAdmin && <MaintenanceBanner />}
            <Component {...pageProps} />
            <Toaster position="top-center" />
        </>
    );
}
