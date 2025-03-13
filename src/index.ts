import { errorIcon, infoIcon, loadingIcon, successIcon, warningIcon } from './assets';
import { setConfig } from './config';
import { addToast } from './toast';
import { ExternalToast, PromiseData, PromiseT, ToastType } from './types';

import './style.scss';

const icons = { success: successIcon, error: errorIcon, info: infoIcon, warning: warningIcon, loading: loadingIcon };

const showToast = (type: keyof typeof icons | null, message: string, options?: ToastType) => {
    const icon = type ? Object.assign(document.createElement('span'), { innerHTML: icons[type] }) : undefined;
    icon?.setAttribute('data-icon', '');
    return addToast(message, { ...options, icon });
};

const promise = <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => {
    if (!data) return;
    let id: string | number | undefined;
    if (data.loading !== undefined) {
        id = toast.loading(data.loading, { description: typeof data.description !== 'function' ? data.description : '' });
    }
    promise = typeof promise === 'function' ? promise() : promise;

    promise
        .then(async _ => {
            const description = typeof data.description === 'function' ? await data.description(_) : data.description;
            if (!data.success) return;
            let success = data.success;
            const success_info = typeof success === 'function' ? await success(_) : success;
            toast.success(success_info as string, { id, description });
        })
        .catch(async _ => {
            const description = typeof data.description === 'function' ? await data.description(_) : data.description;
            if (!data.error) return;
            let error = data.error;
            const error_info = typeof error === 'function' ? await error(_) : error;
            toast.error(error_info as string, { id, description });
        })
        .finally(data.finally);
};

const toast = Object.assign(showToast.bind(null, null), {
    success: showToast.bind(null, 'success'),
    error: showToast.bind(null, 'error'),
    info: showToast.bind(null, 'info'),
    warning: showToast.bind(null, 'warning'),
    promise: promise,
    loading: (message: string, options?: ExternalToast) => showToast('loading', message, { duration: 0, ...options }),
    config: setConfig,
});

export default toast;
