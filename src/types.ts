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

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

export type ExternalToast = Omit<ToastType, 'id' | 'type' | 'title' | 'jsx' | 'delete' | 'promise'> & {
    id?: number | string;
};

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
