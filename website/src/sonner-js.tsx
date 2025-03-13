import toast from 'sonner-js';

function SonnerJs() {
    return (
        <div>
            <button onClick={() => toast('Event has been created')}>default</button>
            <button onClick={() => toast('Sonner', { description: 'An opinionated toast component for React.' })}>description</button>
            <button onClick={() => toast.success('this is a success message')}>success</button>
            <button onClick={() => toast.error('this is a error message')}>error</button>
            <button onClick={() => toast.info('this is a info message')}>info</button>
            <button onClick={() => toast.warning('this is a warning message')}>warning</button>

            <div>
                <button onClick={() => toast.config({ theme: 'dark' })}>配置</button>
                <button onClick={() => toast.config({ position: 'top-left' })}>配置</button>
            </div>
        </div>
    );
}

export default SonnerJs;
