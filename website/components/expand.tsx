// import { toast } from 'sonner';
import { useState } from 'react';
import toast from 'sonner-js';

import { CodeBlock } from './CodeBlock';

export const Expand = () => {
    const [expand, setExpand] = useState(false);

    return (
        <div>
            <h2>Expand</h2>
            <p>
                You can change the amount of toasts visible through the <code>visibleToasts</code> prop.
            </p>
            <div className="buttons">
                <button
                    data-active={expand}
                    className="button"
                    onClick={() => {
                        setExpand(true);
                        toast.config({ expand: true });
                        toast('Event has been created', {
                            description: 'Monday, January 3rd at 6:00pm',
                        });
                    }}
                >
                    Expand
                </button>
                <button
                    data-active={!expand}
                    className="button"
                    onClick={() => {
                        setExpand(false);
                        toast.config({ expand: false });
                        toast('Event has been created', {
                            description: 'Monday, January 3rd at 6:00pm',
                        });
                    }}
                >
                    Default
                </button>
            </div>
            <CodeBlock>{`toast.config({ expand: ${expand} })`}</CodeBlock>
        </div>
    );
};
