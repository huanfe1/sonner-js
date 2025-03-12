export type ConfigType = {
    theme?: 'light' | 'dark';
    richColors?: boolean;
    expand?: boolean;
    position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
    closeButton?: boolean;
    visibleToasts?: number;
    gap?: number;
    offset?: number;
};

const defaultConfig = {
    theme: 'light',
    richColors: false,
    position: 'bottom-right',
    expand: false,
    closeButton: false,
    visibleToasts: 3,
    gap: 14,
    offset: 24,
};

let config = defaultConfig;

export function setConfig(newConfig: ConfigType) {
    config = { ...defaultConfig, ...newConfig };
}

export function getConfig() {
    return config;
}
