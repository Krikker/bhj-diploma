/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let url = options.url?.trim() || '';
    let method = (options.method || 'GET').toUpperCase();
    const data = options.data || null;
    const callback = options.callback || (() => {});
    xhr.responseType = 'json';

    if (method === 'GET' && data) {
        const params = new URLSearchParams();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                params.append(key, data[key]);
            }
        }
        url += (url.includes('?') ? '&' : '?') + params.toString();
    }

    xhr.open(method, url);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status <= 300) {
            callback(null, xhr.response);
        } else {
            callback(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`), null);
        }
    };
    xhr.onerror = () => {
        callback(new Error('Network error'));
    }
    xhr.onabort = () => {
        callback(new Error('Request was aborted'));
    }

    if (method === 'GET') {
        xhr.send();
    } else {
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        xhr.send(formData);
    }
};