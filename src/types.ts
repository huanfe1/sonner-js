export type CommonType = {
    richColors?: boolean;
    position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
    closeButton?: boolean;
};

export type ToasterType = {
    theme?: 'dark' | 'light';
    expand?: boolean;
    visibleToasts?: number;
    gap?: number;
    offset?: number;
} & CommonType;

export type ToastType = {
    description?: string;
    icon?: HTMLElement;
    duration?: number;
    id?: number | string;
} & CommonType;
