import React from 'react';
import toast from 'sonner-js';

import { CodeBlock } from '../CodeBlock';

const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;

export type Position = (typeof positions)[number];

export const Position = ({ position: activePosition, setPosition }: { position: Position; setPosition: React.Dispatch<React.SetStateAction<Position>> }) => {
    return (
        <div>
            <h2>Position</h2>
            <p>Swipe direction changes depending on the position.</p>
            <div className="buttons">
                {positions.map(position => (
                    <button
                        data-active={activePosition === position}
                        className="button"
                        onClick={() => {
                            toast('Event has been created', { position });
                            setPosition(position);
                        }}
                        key={position}
                    >
                        {position}
                    </button>
                ))}
            </div>
            <CodeBlock>{`toast('Event has been created', { position: "${activePosition}" })
            
// or

toast.config({ position: "${activePosition}" })`}</CodeBlock>
        </div>
    );
};
