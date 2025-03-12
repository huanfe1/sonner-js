import { ConfigType } from './config';
import { getOffset, getToaster } from './toaster';

export type OptionsType = {
    description?: string;
    icon?: HTMLElement;
    duration?: number;
    position?: ConfigType['position'];
    id?: number | string;
};

let idNumber = 0;

const toastTimers = new Map<number | string, number>();
const toastMap = new Map<number | string, HTMLElement>();

export function addToast(message: string, options: OptionsType) {
    const toaster = getToaster(options.position);
    let toast: HTMLElement;

    if (options.id && toastMap.has(options.id)) {
        toast = toastMap.get(options.id)!;
        toast.innerHTML = '';

        if (toastTimers.has(options.id)) {
            clearTimeout(toastTimers.get(options.id)!);
            toastTimers.delete(options.id);
        }
    } else {
        toast = document.createElement('li');

        options.id ||= idNumber++;
        toastMap.set(options.id, toast);

        toast.style.transform = 'translateY(calc(var(--lift) * -120%))';
    }

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

    toaster.appendChild(toast);

    window.requestAnimationFrame(() => {
        toast.style.transform = '';
    });

    if (options.duration !== 0) {
        const timeoutId = setTimeout(() => {
            toast.setAttribute('data-state', 'deleting');
            toast.style.setProperty('--offset', `${getOffset(toast) - toast.offsetHeight}px`);
            toast.style.setProperty('--opacity', '0');
            toast.addEventListener(
                'transitionend',
                () => {
                    toaster.removeChild(toast);
                    toastMap.delete(options.id!);
                },
                { once: true },
            );

            toastTimers.delete(options.id!);
        }, options.duration || 3000);

        toastTimers.set(options.id!, timeoutId);
    }

    return options.id;
}
