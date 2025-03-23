import { updateToasterConfig } from './toaster';
import { ToastOptionsType, ToasterType } from './types';

const defaultConfig: Omit<Required<ToasterType>, 'toastOptions'> & { toastOptions: Required<ToastOptionsType> } = {
    theme: 'light',
    expand: false,
    visibleToasts: 3,
    gap: 14,
    offset: 24,
    mobileOffset: 16,
    dir: 'ltr',
    toastOptions: {
        position: 'bottom-right',
        closeButton: false,
        richColors: false,
        duration: 3000,
        onDismiss: () => {},
        onAutoClose: () => {},
    },
};

export let config = { ...defaultConfig };

export function setConfig(userConfig: ToasterType) {
    config = { ...defaultConfig, ...userConfig, toastOptions: { ...defaultConfig.toastOptions, ...userConfig.toastOptions } };
    updateToasterConfig();
}
