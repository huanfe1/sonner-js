<div align="center">
  <h1>🍞 Sonner for Pure JS</h1>
  <p>An elegant toast component designed for Pure JavaScript</p>

  [![npm version](https://img.shields.io/npm/v/sonner-js.svg?style=flat-square)](https://www.npmjs.com/package/sonner-js)
  [![npm downloads](https://img.shields.io/npm/dm/sonner-js.svg?style=flat-square)](https://www.npmjs.com/package/sonner-js)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

  <p><em>Built on <a href="https://sonner.emilkowal.ski/">Sonner</a>, optimized for pure JavaScript environments</em></p>
</div>

---

## ✨ Features

- 🚀 **Zero Dependencies** - Pure JavaScript implementation, no frameworks required
- 📱 **Responsive Design** - Perfect adaptation for mobile and desktop
- 🎨 **Multiple Styles** - Support for success, error, warning, info and more types
- ⚡ **Lightweight** - Small bundle size with excellent performance
- 🔧 **Highly Customizable** - Rich configuration options
- 🌙 **Theme Support** - Built-in light and dark themes
- 📦 **Multi-format Support** - UMD, ESM, CommonJS formats

## 🚀 Quick Start

### Installation

```bash
npm install sonner-js
```

### Basic Usage

```javascript
import toast from 'sonner-js';

// Simple toast
toast('Hello World!');

// Toast with description
toast('Operation successful', {
    description: 'Your data has been saved'
});
```

## 📖 Usage Guide

### Different Toast Types

```javascript
// Success toast
toast.success('Operation successful');

// Error toast
toast.error('Operation failed');

// Info toast
toast.info('This is an information');

// Warning toast
toast.warning('Please note');
```

### Toast with Action Buttons

```javascript
toast('Confirm action', {
    action: {
        label: 'Confirm',
        onClick: () => console.log('User clicked confirm')
    }
});

// With cancel button
toast('Confirm deletion', {
    action: {
        label: 'Cancel',
        onClick: () => console.log('User cancelled operation'),
        cancel: true
    }
});
```

### Promise Handling

```javascript
const fetchData = () => fetch('/api/data');

toast.promise(fetchData, {
    loading: 'Loading...',
    success: 'Data loaded successfully',
    error: 'Failed to load data'
});
```

### Update and Dismiss Toasts

```javascript
// Create toast and get ID
const toastId = toast('Processing...');

// Update toast
toast.success('Processing complete', { id: toastId });

// Dismiss specific toast
toast.dismiss(toastId);

// Dismiss all toasts
toast.dismiss();
```

### Permanent Toasts

```javascript
toast('Important notice', {
    duration: 0  // Set to 0 for permanent display
});
```

## 🌐 CDN Usage

### UMD Format

```html
<script src="https://cdn.jsdelivr.net/npm/sonner-js/dist/umd/index.min.js"></script>
<script>
    sonnerJS('Hello from CDN!');
</script>
```

### ESM Format

```html
<script type="module">
    import toast from 'https://cdn.jsdelivr.net/npm/sonner-js/+esm';
    toast('Hello from ESM!');
</script>
```

## ⚙️ Configuration Options

```javascript
import toast from 'sonner-js';

// Global configuration
toast.config({
    theme: 'dark',           // 'light' | 'dark'
    position: 'top-right',   // Position
    duration: 4000,         // Duration in milliseconds
    closeButton: true,      // Show close button
    richColors: true,        // Rich colors
    expand: true,           // Expand animation
    visibleToasts: 3,       // Number of visible toasts
    gap: 8,                 // Toast spacing
    offset: 16,             // Margin
    mobileOffset: 16,       // Mobile margin
    dir: 'ltr'              // Text direction
});
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
