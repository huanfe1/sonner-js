import { ConfigType } from './config';
import { getOffset, getToaster } from './toaster';

export type OptionsType = {
    description?: string;
    icon?: HTMLElement;
    duration?: number;
    position?: ConfigType['position'];
};

export function addToast(message: string, options: OptionsType) {
    const toaster = getToaster(options.position);

    const toast = document.createElement('li');
    toast.setAttribute('data-sonner-toast', '');

    if (options.icon) {
        toast.appendChild(options.icon.cloneNode(true));
    }

    const textContainer = document.createElement('div');
    textContainer.setAttribute('data-content', '');
    toast.appendChild(textContainer);

    const title = document.createElement('div');
    title.setAttribute('data-title', '');
    title.textContent = message;
    textContainer.appendChild(title);

    if (options.description) {
        const desc = document.createElement('div');
        desc.textContent = options.description;
        desc.setAttribute('data-description', '');
        textContainer.appendChild(desc);
    }

    toast.style.transform = 'translateY(calc(var(--lift) * -120%))';

    toaster.appendChild(toast);

    window.requestAnimationFrame(() => {
        toast.style.transform = '';
    });

    if (options.duration !== 0) {
        setTimeout(() => {
            toast.setAttribute('data-state', 'deleting');
            toast.style.setProperty('--offset', `${getOffset(toast) - toast.offsetHeight}px`);
            toast.style.setProperty('--opacity', '0');
            toast.addEventListener('transitionend', () => toaster.removeChild(toast), { once: true });
        }, options.duration || 3000);
    }

    return toast;
}
