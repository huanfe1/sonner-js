import { ExpandModes } from '@/src/components/ExpandModes';
import { Hero } from '@/src/components/Hero';
import { Installation } from '@/src/components/Installation';
import { Other } from '@/src/components/Other/Other';
import { Position } from '@/src/components/Position';
import { Types } from '@/src/components/Types/Types';
import { Usage } from '@/src/components/Usage';

import Head from '../components/Head';
import Theme from '../components/theme';

export default function Home() {
    return (
        <div className="wrapper">
            <Head />
            <main className="container max-w-[642px]">
                <Hero />
                <div className="content">
                    <Installation />
                    <Usage />
                    <Types />
                    <Theme />
                    <Position />
                    <ExpandModes />
                    <Other />
                </div>
            </main>
        </div>
    );
}
