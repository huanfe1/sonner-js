import { config } from './config';
import { ToasterType } from './types';

import './style.scss';

function getContainer(): HTMLElement {
    let toasters = document.querySelector('[data-sonner-toasters]') as HTMLElement;
    if (toasters) return toasters;
    toasters = document.createElement('div');
    toasters.setAttribute('data-sonner-toasters', '');
    document.body.appendChild(toasters);
    return toasters;
}

export function getToaster(position: ToasterType['position']) {
    const container = getContainer();

    const el = container.querySelector(`ol[data-position="${position}"]`);
    if (el) return el;

    const toaster = document.createElement('ol');
    toaster.setAttribute('data-sonner-toaster', '');

    toaster.setAttribute('data-position', position || config.position);
    toaster.setAttribute('data-expand', config.expand.toString());
    toaster.setAttribute('data-sonner-theme', config.theme);

    toaster.style.setProperty('--gap', `${config.gap}px`);
    toaster.style.setProperty('--offset', `${config.offset}px`);

    const observer = new MutationObserver(() => {
        if (toaster.querySelectorAll('*').length === 0) {
            observer.disconnect();
            container.removeChild(toaster);
        } else {
            assignOffset(toaster);
        }
    });
    observer.observe(toaster, { childList: true });

    // hover to expand
    toaster.addEventListener('mouseenter', () => {
        if (toaster.getAttribute('data-expand') === 'true') return;
        toaster.setAttribute('data-expand', 'true');
        // assignOffset(toaster);
        const exit = () => {
            toaster.setAttribute('data-expand', 'false');
            toaster.removeEventListener('mouseleave', exit);
        };
        toaster.addEventListener('mouseleave', exit);
    });

    container.appendChild(toaster);
    return toaster;
}

function assignOffset(container: HTMLElement) {
    const { visibleToasts, gap } = config;
    const toasts = [...container.querySelectorAll('li:not([data-state="deleting"])')].reverse() as HTMLLIElement[];
    if (toasts.length === 0) return;

    const frontToast = toasts[0];
    if (!getPropertyValue(frontToast, 'init-height')) frontToast.style.setProperty('--init-height', `${frontToast.offsetHeight}px`);

    window.requestAnimationFrame(() => {
        toasts.forEach((toast, index) => {
            const nextCard = toast.nextElementSibling as HTMLLIElement;
            const offset = nextCard ? parseFloat(getPropertyValue(nextCard, 'offset')) + parseFloat(getPropertyValue(nextCard, 'init-height')) + gap : 0;

            toast.style.setProperty('--offset', `${offset}px`);
            toast.style.setProperty('--index', index.toString());

            // limit display toast count
            if (index + 1 > visibleToasts) {
                toast.style.setProperty('--opacity', '0');
            } else {
                toast.style.setProperty('--opacity', '1');
            }
        });
    });
    container.style.setProperty('--front-height', `${toasts[0]?.offsetHeight}px`);
}

export function updateToaster() {
    const container = getContainer();
    container.querySelectorAll('[data-sonner-toaster]').forEach(toaster => {
        toaster.setAttribute('data-expand', config.expand.toString());
        toaster.setAttribute('data-sonner-theme', config.theme);
    });
}

export function getOffset(el: Element): number {
    const offset = getComputedStyle(el).getPropertyValue('--offset');
    if (offset === undefined || offset.match(/%/)) return 0;
    return Math.abs(Number(offset.replace('px', '')));
}

function getPropertyValue(el: Element, key: string) {
    return getComputedStyle(el).getPropertyValue(`--${key}`);
}
