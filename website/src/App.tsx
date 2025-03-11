import toast from 'sonner-js';

import './App.css';

function App() {
    return (
        <>
            <button onClick={() => toast('Event has been created')}>default</button>
            <button onClick={() => toast('Sonner', { description: 'An opinionated toast component for React.' })}>description</button>
            <button onClick={() => toast.success('this is a success message')}>success</button>
            <button onClick={() => toast.error('this is a error message')}>error</button>
            <button onClick={() => toast.info('this is a info message')}>info</button>
            <button onClick={() => toast.warning('this is a warning message')}>warning</button>
        </>
    );
}

export default App;
