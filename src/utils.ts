import moment from 'moment'

export function formatDatetime(datetime?: string, custom_format?: string) {
    if (!datetime) return "";
    return moment(datetime).local().format(custom_format == undefined ? "DD.MM.YYYY HH:mm:ss" : custom_format);
}

export function isNullOrEmpty(value?: string | any[]) {
    return value == undefined || value.length == 0 || (!Array.isArray(value) && value.trim() == "")
}

export function isNullOrFalse(value?: boolean | undefined) {
    return value == undefined || value == false
}

export function isNotNullOrEmpty(value?: string | string[]) {
    return !isNullOrEmpty(value)
}

export function isObject(obj: any) {
    return obj && obj.constructor && obj.constructor === Object;
}
export const isBoolean = (value: any) => typeof value == "boolean"


export function sortByKey(array: Array<any>, key: string, reverse: boolean) {
    function getValue(dict: any) {
        return dict[key]
    }
    array.sort(function (a, b) {
        var x = getValue(a);
        var y = getValue(b);
        if (typeof x == "string") {
            x = x.toLowerCase();
        }
        if (typeof y == "string") {
            y = y.toLowerCase();
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    if (reverse == true) array.reverse();
}