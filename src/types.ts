export type Position = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export type ToasterType = {
    theme?: 'dark' | 'light';
    expand?: boolean;
    visibleToasts?: number;
    offset?: number;
    mobileOffset?: number;
    gap?: number;
    toastOptions?: ToastOptionsType;
};

export type ToastOptionsType = {
    position?: Position;
    closeButton?: boolean;
    richColors?: boolean;
    duration?: number;
};

export type ToastContentType = {
    id?: number | string;
    title: string;
    description?: string;
    type?: 'success' | 'error' | 'info' | 'warning' | 'loading';
    action?: {
        label: string;
        onClick: (event: MouseEvent) => void;
    };
};

export type ToastType = ToastContentType & ToastOptionsType;

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

export type ExternalToast = Omit<ToastType, 'type' | 'title'>;

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
