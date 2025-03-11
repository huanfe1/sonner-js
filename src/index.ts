import { errorIcon, infoIcon, successIcon, warningIcon } from './assets';
import { Options, createCard } from './card';

import './style.scss';

const icons = { success: successIcon, error: errorIcon, info: infoIcon, warning: warningIcon };

const showToast = (type: keyof typeof icons | null, message: string, options: Options = {}) => {
    const icon = type ? Object.assign(document.createElement('span'), { className: 'icon', innerHTML: icons[type] }) : undefined;
    createCard(message, { ...options, icon });
};

const toast = Object.assign(showToast.bind(null, null), {
    success: showToast.bind(null, 'success'),
    error: showToast.bind(null, 'error'),
    info: showToast.bind(null, 'info'),
    warning: showToast.bind(null, 'warning'),
});

export default toast;
