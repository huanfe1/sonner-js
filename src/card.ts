const CONTAINER_ID = 'toast-container';
const MAX_COUNT = 5;
const GAP = 13;

export type Options = {
    description?: string;
    icon?: HTMLElement;
    duration?: number;
};

function getCardContainer() {
    if (document.getElementById(CONTAINER_ID)) return document.getElementById(CONTAINER_ID)!;

    const container = document.createElement('div');
    container.id = CONTAINER_ID;

    container.style.setProperty('--gap', `${GAP}px`);

    container.setAttribute('data-expand', 'false');
    container.addEventListener('mouseenter', () => {
        container.setAttribute('data-expand', 'true');
        assignOffset(container);
    });
    container.addEventListener('mouseleave', () => container.setAttribute('data-expand', 'false'));

    const observer = new MutationObserver(() => assignOffset(container));
    observer.observe(container, { childList: true });

    document.body.appendChild(container);
    return container;
}

export function createCard(message: string, options: Options = {}) {
    const container = getCardContainer();
    const card = document.createElement('li');

    if (options.icon) {
        card.appendChild(options.icon.cloneNode(true));
    }

    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    card.appendChild(textContainer);

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = message;
    textContainer.appendChild(title);

    if (options.description) {
        const desc = document.createElement('div');
        desc.textContent = options.description;
        desc.className = 'desc';
        textContainer.appendChild(desc);
    }

    card.className = 'card';
    card.style.transform = 'translateY(calc(var(--lift) * -120%))';

    container.appendChild(card);

    window.requestAnimationFrame(() => {
        card.style.transform = '';
    });

    setTimeout(() => {
        card.setAttribute('data-state', 'deleting');
        card.style.setProperty('--offset', `${getOffset(card) - card.offsetHeight}px`);
        card.style.setProperty('--opacity', '0');
        card.addEventListener('transitionend', () => container.removeChild(card), { once: true });
    }, options.duration ?? 3000);

    return card;
}

function assignOffset(container: HTMLElement) {
    const cards = [...container.querySelectorAll('li:not([data-state="deleting"])')].reverse() as HTMLLIElement[];
    cards.forEach((card, index) => {
        const nextCard = card.nextElementSibling as HTMLLIElement;
        const offset = nextCard ? getOffset(nextCard) + nextCard.offsetHeight + GAP : 0;
        card.style.setProperty('--offset', `${offset}px`);

        card.setAttribute('data-front', index === 0 ? 'true' : 'false');
        card.style.setProperty('--index', index.toString());

        // limit display toast count
        if (index + 1 > MAX_COUNT) {
            card.style.setProperty('--opacity', '0');
        }
    });
    container.style.setProperty('--front-height', `${cards[0]?.offsetHeight}px`);
}

function getOffset(el: Element): number {
    const offset = getComputedStyle(el).getPropertyValue('--offset');
    if (offset === undefined || offset.match(/%/)) return 0;
    return Math.abs(Number(offset.replace('px', '')));
}
