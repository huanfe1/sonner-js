import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';

import '../globals.css';
import '../style.css';

export default function Nextra({ Component, pageProps }: AppProps): ReactElement {
    return (
        <>
            {/* @ts-ignore */}
            <Component {...pageProps} />
            {/* <Analytics /> */}
        </>
    );
}
