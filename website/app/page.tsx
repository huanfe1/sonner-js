'use client';

import { Installation } from '@/components/Installation';
import { Other } from '@/components/Other/Other';
import { Types } from '@/components/Types';
import { Usage } from '@/components/Usage';
import { Expand } from '@/components/expand';
import Foot from '@/components/foot';
import { Hero } from '@/components/hero';
import { Position } from '@/components/position';
import { Theme } from '@/components/theme';

export default function Home() {
    return (
        <div className="wrapper">
            <main className="container max-w-[642px] mx-auto">
                <Hero />
                <div className="content">
                    <Installation />
                    <Usage />
                    <Types />
                    <Theme />
                    <Position />
                    <Expand />
                    <Other />
                </div>
            </main>
            <Foot />
        </div>
    );
}
