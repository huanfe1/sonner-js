import { config, registerConfigUpdateCallback } from './config';
import { Position } from './types';

// import './style.scss';
import style from './style.scss';

function getContainer(): ShadowRoot {
    const toasters = document.querySelector('[data-sonner-toasters]')?.shadowRoot;
    if (toasters) return toasters;

    const app = document.createElement('div');
    app.setAttribute('data-sonner-toasters', '');
    document.body.appendChild(app);
    const shadow = app.attachShadow({ mode: 'open' });
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(style);
    shadow.adoptedStyleSheets = [sheet];
    return shadow;
}

function updateToasterConfig() {
    const container = getContainer();
    (container.querySelectorAll('[data-sonner-toaster]') as NodeListOf<HTMLElement>).forEach(toaster => {
        toaster.setAttribute('data-expand', config.expand.toString());
        toaster.setAttribute('data-sonner-theme', config.theme);
        toaster.setAttribute('dir', config.dir);

        toaster.style.setProperty('--gap', `${config.gap}px`);
        toaster.style.setProperty('--offset', `${config.offset}px`);
        toaster.style.setProperty('--mobile-offset', `${config.mobileOffset}px`);
    });
}

export function getToaster(position: Position) {
    const container = getContainer();

    const el = container.querySelector(`ol[data-position="${position}"]`);
    if (el) return el;

    const toaster = document.createElement('ol');
    toaster.setAttribute('data-sonner-toaster', '');

    toaster.setAttribute('data-position', position);
    toaster.setAttribute('data-expand', config.expand.toString());
    toaster.setAttribute('data-sonner-theme', config.theme);
    toaster.setAttribute('dir', config.dir);

    toaster.style.setProperty('--gap', `${config.gap}px`);
    toaster.style.setProperty('--offset', `${config.offset}px`);
    toaster.style.setProperty('--mobile-offset', `${config.mobileOffset}px`);

    const observer = new MutationObserver(() => {
        if (toaster.querySelectorAll('*').length === 0) {
            observer.disconnect();
            container.removeChild(toaster);
        } else {
            requestAnimationFrame(() => assignOffset(toaster));
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

export function assignOffset(container: HTMLElement) {
    const { visibleToasts, gap } = config;
    const toasts = [...container.querySelectorAll('li:not([data-state="deleting"])')].reverse() as HTMLLIElement[];
    if (toasts.length === 0) return;

    const frontToast = toasts[0];
    if (!getPropertyValue(frontToast, 'init-height')) {
        frontToast.style.setProperty('--init-height', `${frontToast.offsetHeight}px`);
    }

    toasts.forEach((toast, index) => {
        const nextCard = toast.nextElementSibling as HTMLLIElement;
        const offset = index > 0 ? parseFloat(getPropertyValue(nextCard, 'offset')) + parseFloat(getPropertyValue(nextCard, 'init-height')) + gap : 0;

        toast.style.setProperty('--offset', `${offset}px`);
        toast.style.setProperty('--index', index.toString());

        toast.setAttribute('data-state', index + 1 > visibleToasts ? 'invisible' : 'mounted');
    });

    container.style.setProperty('--front-height', `${toasts[0]?.offsetHeight}px`);
}

export function getOffset(el: Element): number {
    const offset = getComputedStyle(el).getPropertyValue('--offset');
    if (offset === undefined || offset.match(/%/)) return 0;
    return Math.abs(Number(offset.replace('px', '')));
}

function getPropertyValue(el: Element, key: string) {
    return getComputedStyle(el).getPropertyValue(`--${key}`);
}

// Register the config update callback to break circular dependency
registerConfigUpdateCallback(updateToasterConfig);
