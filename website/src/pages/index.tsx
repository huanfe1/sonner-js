import React, { StrictMode, useEffect } from 'react';
import toast from 'sonner-js';

// import { Toaster } from 'sonner';

import { ExpandModes } from '@/src/components/ExpandModes';
import { Hero } from '@/src/components/Hero';
import { Installation } from '@/src/components/Installation';
import { Other } from '@/src/components/Other/Other';
import { Position } from '@/src/components/Position';
import { Types } from '@/src/components/Types/Types';
import { Usage } from '@/src/components/Usage';

import { Footer } from '../components/Footer';
import Head from '../components/Head';
import { How } from '../components/How/How';

export default function Home() {
    const [position, setPosition] = React.useState<Position>('bottom-right');
    const [richColors, setRichColors] = React.useState(false);
    const [closeButton, setCloseButton] = React.useState(false);

    return (
        <div className="wrapper light">
            <Head />
            <main className="container max-w-[642px]">
                <Hero />
                <div className="content">
                    <Installation />
                    <Usage />
                    <Types />
                    <Position position={position} setPosition={setPosition} />
                    <ExpandModes />
                    <Other setCloseButton={setCloseButton} setRichColors={setRichColors} />
                </div>
            </main>
        </div>
    );
}
