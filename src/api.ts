
import * as Utils from "./utils"
import { Aborter, ResponseWithData } from './interfaces'

var DEBUG = true //window.location.host.startsWith("localhost")


class StatusError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode
    }
}

export async function _handleResponseError(response: any) {
    // DEBUG && console.log(response)
    if (!response.ok || response.status >= 300 || response.status < 200) {
        let errorObj = new StatusError("", response.status)
        try {
            if (response.headers.get('content-type') == 'application/json') {
                let temp = await response.json()
                errorObj.message = temp.detail ? temp.detail : temp
            } else {
                errorObj.message = await response.text()
            }
        } catch (error) {
            errorObj.message = response.statusText + ". Response code " + response.status
        }
        throw errorObj
    }
    if (response.headers.get('content-type') == 'application/octet-stream') {  //  || response.body instanceof ReadableStream
        return await response.arrayBuffer();
    }
    let data = response.headers.get('content-type') == 'application/json' ? await response.json() : await response.text()
    if (Utils.isNotNullOrEmpty(data?.error)) throw new Error(data?.error)
    return data;
}

export function get(url: string, onSuccessCallback?: (response: ResponseWithData) => void, onErrorCallback?: (error: Error) => void, aborterObj?: Aborter, headers?: { [key: string]: string }) {
    const startTime = performance.now();
    let signal = null;
    if (aborterObj != null) {
        signal = aborterObj.aborter?.signal;
    };
    return fetch(url, {
        method: "GET",
        headers: Object.assign({}, headers, {
            // Accept: 'application/json',
            // Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXNhbmRpa3JpdmVjLTE3MzExODQ2Mjc3MjcuY2x1c3Rlci1yY3loZWV0eW1uZ3Q0cXg1ZnBzd3VhM3J5NC5jbG91ZHdvcmtzdGF0aW9ucy5kZXYiLCJpYXQiOjE3MzI2NDg2NzYsImV4cCI6MTczMjczNTA3NX0.N7HBm_OHMeBgYUOz2Ye7GXTHEMCi6R5AuiW9xknldLqiChcqPxfwyiwzEgBTcy0-_QfGWDyrjN1vZaT-tVgqJhAKZq1R-br7OBuAFqJQnCiFGdUZN_WQz0g-0iAuw-cxuoxTlrb3kRTywESguLlQqfGH3h_uQHlF4xsK00Or0Sjm7ZgDx6p8qa2pgBh-DKWbj4Td_cE8OWU9824U41GRJY1VV56rdhsgU61cUiwmyxz2KYSxBFCkXKsNkS0KRYVfVSQfZZ4bYOSxW2QGPiq8jNzfoFZbpfwapibwDlBHhcAvLNbO0gxGK3wJiNIFC0AMeh3LeYIuauEmwqxwD9wgdw',
        }),
        // headers: Object.assign({}, { "X-CSRFToken": getCSRFToken() }, headers),
        // body: ""
        // credentials: "include",
        signal: signal
    }).then(async response => {
        // return fetch(url, { signal }).then(async response => {
        // aborterObj.aborter = null;
        let responseWithData = response as ResponseWithData
        responseWithData.data = await _handleResponseError(response)
        DEBUG && console.log(getTimeString(startTime, "Fetch " + url))
        if (onSuccessCallback) onSuccessCallback(responseWithData);
        else return responseWithData;
    }).catch((error: Error) => {
        console.error(error);
        if (onErrorCallback) onErrorCallback(error);
        else return { error: error, data: {} } as ResponseWithData;
    });
}

function getCSRFToken() {
    const inputEl = document.getElementsByName("csrftoken")[0] as any
    return inputEl.value
}

export function postJSON(url: string, data: Object, onSuccessCallback?: (response: ResponseWithData) => void, onErrorCallback?: (error: Error) => void, method = "POST", addCsfrToken = false) {
    const startTime = performance.now();
    let headers: any = { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }
    if (addCsfrToken) {
        headers["X-CSRFToken"] = getCSRFToken()
    }
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
    }).then(async response => {
        let responseWithData = response as ResponseWithData
        responseWithData.data = await _handleResponseError(response)
        DEBUG && console.log(getTimeString(startTime, method + " " + url), data);
        if (onSuccessCallback) onSuccessCallback(responseWithData);
        else return responseWithData;
    }).catch(error => {
        console.error(error);
        if (onErrorCallback) onErrorCallback(error);
        else return { error: error };
    });
}

export function getTimeString(startTime: number, string: string) {
    return `Time ${string} ${Math.round((performance.now() - startTime) / 1000)}s.`
}