import { useState } from 'react';
import { Toaster, toast } from 'sonner';

export default function Sonner() {
    const [state, setState] = useState<string | number>();

    const click = () => {
        const id = toast.loading('loading...');
        setState(id);
    };

    return (
        <div>
            <Toaster visibleToasts={10} />
            <button onClick={click}>left</button>
            <button onClick={() => toast('right')}>right</button>
            <button
                onClick={() => {
                    toast.success('success', { id: state });
                }}
            >
                loading
            </button>
        </div>
    );
}
