import { useState } from 'react';
import toast from 'sonner-js';

import { CodeBlock } from './CodeBlock';

const themes = ['light', 'dark'] as const;

type Theme = (typeof themes)[number];

export default function Theme() {
    const [theme, setTheme] = useState<Theme>('light');
    return (
        <div>
            <h2>Theme</h2>
            <p>You can smoothly switch between light mode and dark mode.</p>
            <div className="buttons">
                <button
                    className="button"
                    data-active={theme === 'light'}
                    onClick={() => {
                        toast.config({ theme: 'light' });
                        setTheme('light');
                        toast('Event has been created');
                    }}
                >
                    Light
                </button>
                <button
                    className="button"
                    data-active={theme === 'dark'}
                    onClick={() => {
                        toast.config({ theme: 'dark' });
                        setTheme('dark');
                        toast('Event has been created');
                    }}
                >
                    Dark
                </button>
            </div>
            <CodeBlock>{`toast.config({ theme: '${theme}' })`}</CodeBlock>
        </div>
    );
}
