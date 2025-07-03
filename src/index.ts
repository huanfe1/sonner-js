import { setConfig } from './config';
import { addToast, dismissToast } from './toast';
import { ExternalToast, PromiseData, PromiseT } from './types';

const promise = <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => {
    if (!data) return;
    let id: string | number | undefined;
    if (data.loading !== undefined) {
        id = toast.loading(data.loading, {
            description: typeof data.description !== 'function' ? data.description : '',
        });
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

const toast = (message: string, options?: Omit<ExternalToast, 'richColors'>) => addToast({ title: message, ...options });

toast.message = (message: string, options?: Omit<ExternalToast, 'richColors'>) => addToast({ title: message, ...options });
toast.success = (message: string, options?: ExternalToast) => addToast({ type: 'success', title: message, ...options });
toast.error = (message: string, options?: ExternalToast) => addToast({ type: 'error', title: message, ...options });
toast.info = (message: string, options?: ExternalToast) => addToast({ type: 'info', title: message, ...options });
toast.warning = (message: string, options?: ExternalToast) => addToast({ type: 'warning', title: message, ...options });
toast.loading = (message: string, options?: ExternalToast) => addToast({ type: 'loading', title: message, duration: 0, ...options });
toast.dismiss = dismissToast;
toast.promise = promise;
toast.config = setConfig;

export default toast;
