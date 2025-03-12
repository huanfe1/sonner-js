import { config } from './config';
import { ToasterType } from './types';

import './style.scss';

let container: HTMLElement | null = null;

function getContainer(): HTMLElement {
    if (container) return container;
    container = document.createElement('div');
    document.body.appendChild(container);
    return container;
}

export function getToaster(position: ToasterType['position']) {
    const container = getContainer();

    const el = container.querySelector(`ol[data-position="${position}"]`);
    if (el) return el;

    const toaster = document.createElement('ol');
    toaster.setAttribute('data-soner-toaster', '');

    toaster.setAttribute('data-position', position || config.position);
    toaster.setAttribute('data-expand', config.expand.toString());

    toaster.style.setProperty('--gap', `${config.gap}px`);
    toaster.style.setProperty('--offset', `${config.offset}px`);

    const observer = new MutationObserver(() => {
        assignOffset(toaster);
        if (toaster.querySelectorAll('*').length === 0) {
            observer.disconnect();
            container.removeChild(toaster);
        }
    });
    observer.observe(toaster, { childList: true });

    // hover to expand
    toaster.addEventListener('mouseenter', () => {
        if (toaster.getAttribute('data-expand') === 'true') return;
        toaster.setAttribute('data-expand', 'true');
        assignOffset(toaster);
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
    const cards = [...container.querySelectorAll('li:not([data-state="deleting"])')].reverse() as HTMLLIElement[];
    cards.forEach((card, index) => {
        const nextCard = card.nextElementSibling as HTMLLIElement;
        const offset = nextCard ? getOffset(nextCard) + nextCard.offsetHeight + gap : 0;
        card.style.setProperty('--offset', `${offset}px`);

        card.style.setProperty('--index', index.toString());

        // limit display toast count
        if (index + 1 > visibleToasts) {
            card.style.setProperty('--opacity', '0');
        } else {
            card.style.setProperty('--opacity', '1');
        }
    });
    container.style.setProperty('--front-height', `${cards[0]?.offsetHeight}px`);
}

export function getOffset(el: Element): number {
    const offset = getComputedStyle(el).getPropertyValue('--offset');
    if (offset === undefined || offset.match(/%/)) return 0;
    return Math.abs(Number(offset.replace('px', '')));
}
