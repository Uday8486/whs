
import { get } from 'lodash';
import { Store } from 'redux';
import qs from 'qs';
import { handleGlobalError } from '../actions/globalError';

let store: Store | null = null;

export function setStore(s: Store) {
    store = s;
}
export const globalErrorHandler = (err: ResponseError) => {
    const status = get(err, 'response.status', null);
    if (status === 401) {
        // TODO this url currently does not exist, not sure what we should do?
        window.location.href = '/need-authorization';
    } else if (err.name !== 'AbortError') {
        // Abort errors occur when a newer request aborted the previous request; we can safely ignore these
        store!.dispatch(handleGlobalError(err.message));
    }

    throw err; // Rethrow so that the source component can still take action if needed
};

interface RequestOptions {
    url: string;
    method: string;
    headers?: HeadersInit;
    noContentType?: boolean;
    data?: unknown;
    file?: File | FormData;
    queryParams?: Record<string, unknown>;
    signal?: AbortSignal;
}

interface ResponseError extends Error {
    response?: Response;
    meta?: Record<string, unknown>;
}

const checkStatus = <T>(data: T, response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return;
    }
    const error = new Error(get(data, 'message', null) || response.statusText) as ResponseError;
    error.response = response;
    throw error;
};

function getBody({ data, file }: RequestOptions) {
    if (file) {
        return file;
    }
    return data ? JSON.stringify(data) : undefined;
}

/**
 * When making a request take care to:
 * - define queryParams as request options, not as part of the url
 */
export async function request<T>(options: RequestOptions): Promise<T> {
    const { url, method, signal, noContentType } = options;
    let { queryParams } = options;
    const presetHeaders = {} as { [key: string]: string };
    if (!noContentType) {
        presetHeaders['Content-Type'] = 'application/json';
    }

    const headers = options.headers ? { ...presetHeaders, ...options.headers } : presetHeaders;
    const body = getBody(options);

    const urlWithQuery = queryParams ? `${url}?${qs.stringify(queryParams)}` : url;

    try {
        const response = await fetch(urlWithQuery, {
            method,
            body,
            headers,
            signal,
        });

        let data = null;
        const contentType = response.headers.get('Content-Type');
        if (contentType && /application\/json/i.test(contentType)) {
            data = await response.json();
        }
        checkStatus(data, response);

        return data;
    } catch (err: unknown) {
        console.log(`CAUGHT`);
        return globalErrorHandler(err as ResponseError);
    }
}