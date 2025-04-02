# Sonner for Pure JS

An opinionated toast component for Pure JS.

Base on [Sonner](https://sonner.emilkowal.ski/)

## Usage

To start using the library, install it in your project:

```bash
npm install sonner-js
```

Then import it and use it directly.

```js
import toast from 'sonner-js';

toast('My first toast');
```

## Types

### Default

```js
toast('Event has been created');
```

With custom description:

```js
toast('Event has been created', {
    description: 'This is a description',
});
```

### Success

```js
toast.success('Event has been created');
```

### Error

```js
toast.error('Event has not been created');
```

### Info

```js
toast.info('Be at the area 10 minutes before the event time');
```

### Warning

```js
toast.warning('Be at the area 10 minutes before the event time');
```

### Action

```js
toast('Event has been created', {
    action: {
        label: 'Action',
        onClick: () => console.log('Action!'),
    },
});
```

With cancel button:

```js
toast('Event has been created', {
    action: {
        label: 'Cancel',
        onClick: () => console.log('Cancel!'),
        cancel: true,
    },
});
```

### Promise

```js
const promise = () => new Promise(resolve => {
    setTimeout(() => resolve({ name: 'Sonner' }), 2000);
});
toast.promise(promise, {
    loading: 'Loading...',
    success: data => {
        return `${data.name} toast has been added`;
    },
    error: 'Error',
});
```

## Others

### Update toasts

You can update existing toast by passing the toast id:

```js
const id = toast('Toast has been updated');

toast.success('Toast has been updated', {
    id: toastId,
});
```

### Dismiss toasts

You can dismiss toast by use `toast.dismiss()`

```js
const toastId = toast('Event has been created');

toast.dismiss(toastId);
```

You can also dismiss all toasts by without an id.

```js
toast.dismiss();
```

### Permanent toasts

If you want a toast to never disappear, you can set the `duration` to `0`.

```js
toast('Event has been created', {
    duration: 0,
});
```

## License

MIT Licensed.
