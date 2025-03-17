# Sonner for Pure JS

An opinionated toast component for Pure JS.

Base on [Sonner](https://sonner.emilkowal.ski/)

## Install

```bash
pnpm add sonner-js
# or
yarn add sonner-js
# or
npm install sonner-js
```

## Usage

```js
import toast from 'sonner-js';

toast('My first toast');
```

## Types

```js
toast('Event has been created');

toast('Event has been created', {
    description: 'This is a description',
});

toast.success('Event has been created');

toast.error('Event has not been created');

toast.info('Be at the area 10 minutes before the event time');

toast.warning('Be at the area 10 minutes before the event time');

toast('Event has been created', {
    action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
    },
});

const promise = () => new Promise(resolve => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
toast.promise(promise, {
    loading: 'Loading...',
    success: data => {
        return `${data.name} toast has been added`;
    },
    error: 'Error',
});
```

## Customization

### Toast

```js
toast('Event has been created', {
    position: 'bottom-right',
    closeButton: true,
    richColors: true,
    duration: 3000,
})
```

### Toaster

```js
toast.config({
    theme: 'light',
    expand: false,
    visibleToasts: 3,
    gap: 14,
    offset: 24,
    mobileOffset: 16,
    dir: 'ltr',
    toastOptions: {
        position: 'bottom-right',
        closeButton: false,
        richColors: false,
        duration: 3000,
    },
});
```

## License

MIT Licensed.