export type Position = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export type CommonType = {
    position?: Position;
    closeButton?: boolean;
};

export type ToasterType = {
    theme?: 'dark' | 'light';
    expand?: boolean;
    visibleToasts?: number;
    gap?: number;
    offset?: number;
    richColors?: boolean;
} & CommonType;

export type ToastType = {
    id?: number | string;
    title: string;
    description?: string;
    duration?: number;
    type?: 'success' | 'error' | 'info' | 'warning' | 'loading';
    action?: {
        label: string;
        onClick: (event: MouseEvent) => void;
    };
} & CommonType;

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

export type ExternalToast = Omit<ToastType, 'type' | 'title' | 'jsx' | 'delete' | 'promise'>;

export interface PromiseIExtendedResult extends ExternalToast {
    message: string;
}

export type PromiseTExtendedResult<Data = any> = PromiseIExtendedResult | ((data: Data) => PromiseIExtendedResult | Promise<PromiseIExtendedResult>);

export type PromiseTResult<Data = any> = string | ((data: Data) => string | Promise<string>);

export type PromiseExternalToast = Omit<ExternalToast, 'description'>;

export type PromiseData<ToastData = any> = PromiseExternalToast & {
    loading?: string;
    success?: PromiseTResult<ToastData> | PromiseTExtendedResult<ToastData>;
    error?: PromiseTResult | PromiseTExtendedResult;
    description?: PromiseTResult;
    finally?: () => void | Promise<void>;
};
