import { CodeBlock } from '../CodeBlock';

export const Usage = () => {
    return (
        <div>
            <h2>Usage</h2>
            <p>Render the toaster in the root of your app.</p>
            <CodeBlock initialHeight={270}>{`import toast from 'sonner-js'

// ...

toast('My first toast')`}</CodeBlock>
        </div>
    );
};
