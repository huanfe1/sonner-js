import './index.css';
import { successIcon, errorIcon, infoIcon, warningIcon } from './assets';
import { createCard } from './card';

const createHandler = (type: string) => {
    const icon = document.createElement('span');
    icon.className = 'icon';
    if (type === 'success') {
        icon.innerHTML = successIcon;
        return (message: string, { description }: { description?: string } = {}) => createCard(message, { description, icon });
    } else if (type === 'error') {
        icon.innerHTML = errorIcon;
        return (message: string, { description }: { description?: string } = {}) => createCard(message, { description, icon });
    } else if (type === 'info') {
        icon.innerHTML = infoIcon;
        return (message: string, { description }: { description?: string } = {}) => createCard(message, { description, icon });
    } else if (type === 'warning') {
        icon.innerHTML = warningIcon;
        return (message: string, { description }: { description?: string } = {}) => createCard(message, { description, icon });
    }
};

const toast = (message: string, { description }: { description?: string } = {}) => {
    createCard(message, { description });
};

toast.success = createHandler('success');
toast.error = createHandler('error');
toast.info = createHandler('info');
toast.warning = createHandler('warning');

export default toast;
