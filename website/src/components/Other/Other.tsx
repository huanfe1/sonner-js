import React from 'react';
import { useMemo } from 'react';
// import { toast } from 'sonner';
import toast from 'sonner-js';

import { CodeBlock } from '../CodeBlock';

export const Other = () => {
    const allTypes = useMemo(() => [
        {
            name: 'Rich Colors Success',
            snippet: `toast.success('Event has been created', { richColors: true })`,
            action: () => {
                toast.success('Event has been created', { richColors: true });
            },
        },
        {
            name: 'Rich Colors Error',
            snippet: `toast.error('Event has not been created', { richColors: true })`,
            action: () => {
                toast.error('Event has not been created', { richColors: true });
            },
        },
        {
            name: 'Rich Colors Info',
            snippet: `toast.info('Be at the area 10 minutes before the event time', { 
    richColors: true,
    closeButton: true,
})`,
            action: () => {
                toast.info('Be at the area 10 minutes before the event time', {
                    richColors: true,
                    closeButton: true,
                });
            },
        },
        {
            name: 'Rich Colors Warning',
            snippet: `toast.warning('Event start time cannot be earlier than 8am', { 
    richColors: true,
    closeButton: true,
})`,
            action: () => {
                toast.warning('Event start time cannot be earlier than 8am', {
                    richColors: true,
                    closeButton: true,
                });
            },
        },
        {
            name: 'Close Button',
            snippet: `toast('Event has been created', {
    description: 'Monday, January 3rd at 6:00pm',
    closeButton: true,
})`,
            action: () => {
                toast('Event has been created', {
                    description: 'Monday, January 3rd at 6:00pm',
                    closeButton: true,
                });
            },
        },
    ]);

    const [activeType, setActiveType] = React.useState(allTypes[0]);

    return (
        <div>
            <h2>Other</h2>
            <div className="buttons">
                {allTypes.map(type => (
                    <button
                        className="button"
                        onClick={() => {
                            type.action();
                            setActiveType(type);
                        }}
                        key={type.name}
                    >
                        {type.name}
                    </button>
                ))}
            </div>
            <CodeBlock>{activeType.snippet}</CodeBlock>
        </div>
    );
};
