import axios from 'axios';
import { buildURL } from 'common/url';
import * as $ from 'jquery';
import 'jquery.cookie';
$(document).ajaxStart(() => { (window as any).Pace.restart(); });

const API_SUBTYPE = 'lms';

function countDone(cb: (r: any) => void) {
    return (r: any) => {
        cb(r.data);
    };
}

function countErrorDone(cb: (r: any) => void) {
    return (r: any) => {
        cb(r);
    };
}

export function ajaxPost(url: string, data: object, done: (result: any) => void, error: (error: any) => void) {
    axios({
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': `application/vnd.${API_SUBTYPE}.v1+json`,
            'Authorization': `Bearer ${$.cookie('token')}`,
        },
        data: JSON.stringify(data),
    }).then(countDone(done)).catch(countErrorDone((err) => {
        console.warn(url, err);
        error(err);
    }));
}

export function ajaxGet(url: string, done: (result: any) => void, error: (error: any) => void) {
    axios({
        method: 'GET',
        url,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': `application/vnd.${API_SUBTYPE}.v1+json`,
            'Authorization': `Bearer ${$.cookie('token')}`,
        },
    }).then(countDone(done)).catch(countErrorDone(error));
}

export function ajaxPostFormData(
    url: string,
    data: FormData,
    done: (result: any) => void,
    error: (error: any) => void) {

    axios({
        method: 'POST',
        url,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': `application/vnd.${API_SUBTYPE}.v1+json`,
            'Authorization': `Bearer ${$.cookie('token')}`,
        },
        data,
    }).then(countDone(done)).catch(countErrorDone(error));
}

export function postPromise(url: string, data: object): Promise<any> {
    return new Promise((resolve, reject) => {
        ajaxPost(url, data, resolve, reject);
    });
}

export function getPromise(url: string, param?: object): Promise<any> {
    const full = buildURL(url, param);
    return new Promise((resolve, reject) => {
        ajaxGet(full, resolve, reject);
    });
}

export function postFormDataPromise(url: string, data: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
        ajaxPostFormData(url, data, resolve, reject);
    });
}
