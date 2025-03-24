import { closeIcon } from './assets';
import { errorIcon, infoIcon, loadingIcon, successIcon, warningIcon } from './assets';
import { config } from './config';
import { getToaster } from './toaster';
import { ToastType } from './types';

const icons = { success: successIcon, error: errorIcon, info: infoIcon, warning: warningIcon, loading: loadingIcon };

const toastTimers = new Map<number | string, { timeId: number; startTime: number; remainingTime: number }>();
const toastMap = new Map<number | string, HTMLElement>();

let loadingCurrentTime: CSSNumberish | null = null;

export function addToast(options: ToastType) {
    const id = options.id ?? crypto.randomUUID();

    const duration = options.duration ?? config.toastOptions.duration;
    const closeButton = options.closeButton ?? config.toastOptions.closeButton;
    const position = options.position ?? config.toastOptions.position;
    const richColors = options.richColors ?? config.toastOptions.richColors;
    const invert = options.invert ?? config.toastOptions.invert;

    const onDismiss = () => {
        options.onDismiss && options.onDismiss(options);
        config.toastOptions.onDismiss(options);
    };
    const onAutoClose = () => {
        options.onAutoClose && options.onAutoClose(options);
        config.toastOptions.onAutoClose(options);
    };

    const toaster = getToaster(position);

    const oldToast = (options.id && toastMap.get(id)?.isConnected && toastMap.get(id)) || null;

    const toast: HTMLElement = document.createElement('li');

    toast.setAttribute('data-sonner-toast', '');
    options.type && toast.setAttribute('data-type', options.type);
    invert && toast.setAttribute('data-invert', '');

    // richColors
    if (richColors && options.type) {
        toast.setAttribute('data-rich-colors', '');
    }

    // add close button
    const close = document.createElement('button');
    close.setAttribute('data-close-button', closeButton.toString());
    close.innerHTML = closeIcon;
    close.addEventListener('click', () => {
        dismissToast(id);
        onDismiss();
    });
    toast.appendChild(close);

    if (options.type) {
        const icon = document.createElement('span');
        icon.innerHTML = icons[options.type];
        icon.setAttribute('data-icon', '');
        toast.appendChild(icon);

        if (options.type === 'loading' && oldToast) {
            const currentTime = oldToast.querySelector('[data-icon] div')?.getAnimations()?.[0].currentTime;
            if (currentTime) {
                loadingCurrentTime = currentTime;
            }
        }
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
        options.action.cancel && button.setAttribute('data-cancel', '');
        button.addEventListener('click', e => {
            options.action?.onClick(e);
            dismissToast(id);
        });
        toast.appendChild(button);
    }

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

    // close toast
    if (duration > 0) {
        const timeId = setTimeout(() => {
            onAutoClose();
            dismissToast(id);
        }, duration);

        toastTimers.set(id, { timeId, startTime: new Date().getTime(), remainingTime: duration });

        // swipe toast to dismiss
        toast.addEventListener('mousedown', e => {
            toast.setAttribute('data-swiping', 'true');
            const startX = e.clientX;
            const startY = e.clientY;

            let deltaX = 0;
            let deltaY = 0;
            let directionLocked: 'x' | 'y' | null = null;

            const [positionY, positionX] = position.split('-');
            const liftX = positionX === 'right' ? 1 : -1;
            const liftY = positionY === 'bottom' ? 1 : -1;

            if (positionX === 'center') {
                directionLocked = 'y';
            }

            const onMouseMove = (e: MouseEvent) => {
                deltaX = e.clientX - startX;
                deltaY = e.clientY - startY;

                directionLocked ??= Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';

                if (directionLocked === 'x') {
                    const resistanceCoefficient = deltaX * liftX < 0 ? 0.02 : 1;
                    deltaX *= resistanceCoefficient;
                    toast.style.setProperty('--swipe-amount-x', `${deltaX}px`);
                    toast.style.setProperty('--swipe-amount-y', `0`);
                } else if (directionLocked === 'y') {
                    const resistanceCoefficient = deltaY * liftY < 0 ? 0.02 : 1;
                    deltaY *= resistanceCoefficient;
                    toast.style.setProperty('--swipe-amount-y', `${deltaY}px`);
                    toast.style.setProperty('--swipe-amount-x', `0`);
                }
            };

            const onMouseUp = () => {
                if (directionLocked === 'x' && Math.abs(deltaX) > 30) {
                    toast.style.setProperty('--swipe-amount-x', `${liftX * 300}%`);
                    onDismiss();
                    dismissToast(id, 200);
                } else if (directionLocked === 'y' && Math.abs(deltaY) > 10) {
                    toast.style.setProperty('--swipe-amount-y', `${liftY * 300}%`);
                    onDismiss();
                    dismissToast(id, 200);
                } else {
                    toast.setAttribute('data-swiping', 'false');
                    toast.style.setProperty('--swipe-amount-x', '0');
                    toast.style.setProperty('--swipe-amount-y', '0');
                }

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }

    if (oldToast) {
        toast.setAttribute('style', oldToast.getAttribute('style') || '');
        toast.setAttribute('data-mounted', 'true');
        toaster.replaceChild(toast, oldToast);
        toastMap.set(id, toast);

        if (loadingCurrentTime) {
            const animations = toast.querySelector('[data-icon] div')?.getAnimations();
            if (animations) {
                animations[0].currentTime = loadingCurrentTime;
            }
        }
    } else {
        toaster.appendChild(toast);
        toastMap.set(id, toast);
    }

    return id;
}

export function dismissToast(id?: ToastType['id'], exitTime: number = 400) {
    if (toastMap.size === 0) return;

    if (id === undefined) {
        toastMap.forEach((_, index) => dismissToast(index));
        return;
    }

    const toast = toastMap.get(id);
    if (!toast) return;

    toast.setAttribute('data-state', 'deleting');
    setTimeout(() => window.requestAnimationFrame(() => toast.remove()), exitTime);
    toastMap.delete(id);
    toastTimers.delete(id);
}
