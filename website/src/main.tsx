import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import SonnerJs from './sonner-js.tsx';
import Sonner from './sonner.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="container">
            {/* <SonnerJs /> */}
            <Sonner />
        </div>
    </StrictMode>,
);
