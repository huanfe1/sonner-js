import { updateToaster } from './toaster';
import { ToasterType } from './types';

const defaultConfig: Required<ToasterType> = {
    theme: 'light',
    richColors: false,
    position: 'bottom-right',
    expand: false,
    closeButton: false,
    visibleToasts: 3,
    gap: 14,
    offset: 24,
};

export let config = { ...defaultConfig };

export function setConfig(userConfig: ToasterType) {
    config = { ...defaultConfig, ...userConfig };
    updateToaster();
}
