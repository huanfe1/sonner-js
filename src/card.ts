const CONTAINER_ID = 'toast-container';
const DURATION = 3000;
const OFFSET = 10;
const MAX_COUNT = 5;

type Options = {
    description?: string;
    icon?: HTMLElement;
};

function getCardContainer() {
    if (document.getElementById(CONTAINER_ID)) return document.getElementById(CONTAINER_ID)!;
    const container = document.createElement('div');
    container.id = CONTAINER_ID;

    const observer = new MutationObserver(assignOffset);
    observer.observe(container, { childList: true });

    document.body.appendChild(container);
    return container;
}

export function createCard(message: string, { description, icon }: Options = {}) {
    const container = getCardContainer();
    const card = document.createElement('li');

    if (icon) {
        card.appendChild(icon.cloneNode(true));
    }

    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    card.appendChild(textContainer);

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = message;
    textContainer.appendChild(title);

    if (description) {
        const desc = document.createElement('div');
        desc.textContent = description;
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
    }, DURATION);

    return card;
}

function assignOffset() {
    const cards = ([...document.querySelectorAll('#toast-container li:not([data-state="deleting"])')] as HTMLLIElement[]).reverse();
    cards.forEach((card, index) => {
        const nextCard = card.nextElementSibling as HTMLLIElement;
        const offset = nextCard ? getOffset(nextCard) + nextCard.offsetHeight + OFFSET : 0;
        card.style.setProperty('--offset', `${offset}px`);
        if (index + 1 > MAX_COUNT) {
            card.style.setProperty('--opacity', '0');
        }
    });
}

function getOffset(el: Element): number {
    const offset = getComputedStyle(el).getPropertyValue('--offset');
    if (offset === undefined || offset.match(/%/)) return 0;
    return Math.abs(Number(offset.replace('px', '')));
}
