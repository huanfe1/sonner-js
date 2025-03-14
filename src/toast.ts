import { closeIcon } from './assets';
import { errorIcon, infoIcon, loadingIcon, successIcon, warningIcon } from './assets';
import { config } from './config';
import { getOffset, getToaster } from './toaster';
import { ToastType } from './types';

const icons = { success: successIcon, error: errorIcon, info: infoIcon, warning: warningIcon, loading: loadingIcon };

const toastTimers = new Map<number | string, { timeId: number; startTime: number; remainingTime: number }>();
const toastMap = new Map<number | string, HTMLElement>();

export function addToast(options: ToastType) {
    let toast: HTMLElement;

    const id = options.id || crypto.randomUUID();
    const duration = options.duration || 3000;
    const closeButton = options.closeButton === undefined ? config.closeButton : options.closeButton;
    const position = options.position || config.position;

    const toaster = getToaster(position);

    // Reuse existing toast if provided id
    if (options.id && toastMap.has(id)) {
        toast = toastMap.get(id)!;

        toast.innerHTML = '';

        clearTimeout(toastTimers.get(id)?.timeId);
        const timeId = setTimeout(dismissToast, duration, id);
        toastTimers.set(id, { timeId, startTime: new Date().getTime(), remainingTime: duration });
    } else {
        toast = document.createElement('li');
        toast.setAttribute('data-sonner-toast', '');

        toast.style.setProperty('--offset', '-120%');

        // pause all timers when hover toaster
        toast.addEventListener('mouseenter', () => {
            toastTimers.forEach(time => {
                clearTimeout(time.timeId);
                const now = new Date().getTime();
                const diff = now - time.startTime;
                time.remainingTime -= diff;
            });
        });

        toast.addEventListener('mouseleave', () => {
            toastTimers.forEach((time, _id) => {
                const now = new Date().getTime();
                time.startTime = now;
                time.timeId = setTimeout(dismissToast, time.remainingTime, _id);
            });
        });

        if (options.duration !== 0) {
            const timeId = setTimeout(dismissToast, duration, id);
            toastTimers.set(id, { timeId, startTime: new Date().getTime(), remainingTime: duration });
        }
    }

    // add close button
    const close = document.createElement('span');
    close.setAttribute('data-close-button', closeButton.toString());
    close.innerHTML = closeIcon;
    close.addEventListener('click', () => dismissToast(id), { once: true });
    toast.appendChild(close);

    // add content
    if (options.type) {
        const icon = document.createElement('span');
        icon.innerHTML = icons[options.type];
        icon.setAttribute('data-icon', '');
        toast.appendChild(icon);
    }

    const content = document.createElement('div');
    content.setAttribute('data-content', '');
    toast.appendChild(content);

    const title = document.createElement('div');
    title.setAttribute('data-title', '');
    title.innerHTML = options.title;
    content.appendChild(title);

    if (options.description) {
        const desc = document.createElement('div');
        desc.textContent = options.description;
        desc.setAttribute('data-description', '');
        content.appendChild(desc);
    }

    if (options.action) {
        const button = document.createElement('span');
        button.setAttribute('data-button', '');
        button.textContent = options.action.label;
        button.addEventListener('click', e => {
            options.action?.onClick(e);
            dismissToast(id);
        });
        toast.appendChild(button);
    }

    if (!(options.id && toastMap.has(id))) {
        toaster.appendChild(toast);
        toastMap.set(id, toast);
    }

    return id;
}

export function dismissToast(id?: ToastType['id']) {
    if (toastMap.size === 0) return;

    if (id === undefined) {
        toastMap.forEach((_, index) => dismissToast(index));
        return;
    }

    const toast = toastMap.get(id);
    if (!toast) return;

    toast.setAttribute('data-state', 'deleting');
    toast.style.setProperty('--offset', `${getOffset(toast) - toast.offsetHeight}px`);
    toast.style.setProperty('--opacity', '0');
    toast.addEventListener('transitionend', () => window.requestAnimationFrame(() => toast.remove()), { once: true });

    toastMap.delete(id);
    toastTimers.delete(id);
}
