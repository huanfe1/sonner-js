import { errorIcon, infoIcon, loadingIcon, successIcon, warningIcon } from './assets';
import { setConfig } from './config';
import { type OptionsType, addToast } from './toast';

import './style.scss';

const icons = { success: successIcon, error: errorIcon, info: infoIcon, warning: warningIcon, loading: loadingIcon };

const showToast = (type: keyof typeof icons | null, message: string, options: OptionsType = {}) => {
    const icon = type ? Object.assign(document.createElement('span'), { innerHTML: icons[type] }) : undefined;
    icon?.setAttribute('data-icon', '');
    addToast(message, { ...options, icon });
};

const toast = Object.assign(showToast.bind(null, null), {
    success: showToast.bind(null, 'success'),
    error: showToast.bind(null, 'error'),
    info: showToast.bind(null, 'info'),
    warning: showToast.bind(null, 'warning'),
    loading: (message: string, options: OptionsType = {}) => showToast('loading', message, { duration: 0, ...options }),
    config: setConfig,
});

export default toast;
