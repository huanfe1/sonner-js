import { type Metadata } from 'next';

import Analytics from '@/components/analytics';
import '@/styles/globals.css';
import '@/styles/index.css';
import '@/styles/style.css';

const ogImage = 'https://sonner-js.huanfe1.com/og.png';

export const metadata: Metadata = {
    title: 'Sonner-JS',
    description: 'An opinionated toast component for Pure JS.',
    twitter: {
        images: ogImage,
        card: 'summary_large_image',
        site: '@huanfe1',
        creator: '@huanfe1',
    },
    icons: {
        shortcut: '/favicon.ico',
    },
    openGraph: {
        title: 'Sonner-JS',
        description: 'An opinionated toast component for Pure JS.',
        url: 'https://sonner-js.huanfe1.com/',
        siteName: 'Sonner-JS',
        locale: 'en',
        type: 'website',
        images: ogImage,
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" href="favicon.ico" />
                {process.env.NODE_ENV !== 'development' && <Analytics />}
            </head>
            <body>{children}</body>
        </html>
    );
}
