import React from 'react';
import { useMemo } from 'react';
// import { toast } from 'sonner';
import toast from 'sonner-js';

import { CodeBlock } from '../CodeBlock';

// import styles from './other.module.css';

export const Other = ({
    setRichColors,
    setCloseButton,
}: {
    setRichColors: React.Dispatch<React.SetStateAction<boolean>>;
    setCloseButton: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const allTypes = useMemo(
        () => [
            {
                name: 'Rich Colors Success',
                snippet: `toast.success('Event has been created')`,
                action: () => {
                    toast.success('Event has been created');
                    // setRichColors(true);
                },
            },
            {
                name: 'Rich Colors Error',
                snippet: `toast.error('Event has not been created')`,
                action: () => {
                    toast.error('Event has not been created');
                    // setRichColors(true);
                },
            },
            {
                name: 'Rich Colors Info',
                snippet: `toast.info('Be at the area 10 minutes before the event time')`,
                action: () => {
                    toast.info('Be at the area 10 minutes before the event time');
                    // setRichColors(true);
                },
            },
            {
                name: 'Rich Colors Warning',
                snippet: `toast.warning('Event start time cannot be earlier than 8am')`,
                action: () => {
                    toast.warning('Event start time cannot be earlier than 8am');
                    // setRichColors(true);
                },
            },
            {
                name: 'Close Button',
                snippet: `toast('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm', closeButton: true
})`,
                action: () => {
                    toast('Event has been created', {
                        description: 'Monday, January 3rd at 6:00pm',
                        closeButton: true,
                    });
                },
            },
        ],
        [setRichColors],
    );

    const [activeType, setActiveType] = React.useState(allTypes[0]);

    const richColorsActive = activeType?.name?.includes('Rich');
    const closeButtonActive = activeType?.name?.includes('Close');

    return (
        <div>
            <h2>Other</h2>
            <div className="buttons">
                {allTypes.map(type => (
                    <button
                        className="button"
                        onClick={() => {
                            toast.config({ richColors: richColorsActive });
                            type.action();
                            setActiveType(type);
                        }}
                        key={type.name}
                    >
                        {type.name}
                    </button>
                ))}
            </div>
            <CodeBlock>
                {`toast.config({${richColorsActive ? 'richColors ' : ''}})
${activeType.snippet || ''}

// ...

toast.config({${richColorsActive ? 'richColors ' : ''}}) ${closeButtonActive ? 'closeButton ' : ''}/>`}
            </CodeBlock>
        </div>
    );
};
