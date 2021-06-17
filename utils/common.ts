import moment from 'moment';
interface ResopnseReturn {
    status: 0 | 1,
    code: number | string,
    msg: string,
    data: any,
    path: string

}

export function isNumeric(str: string): boolean {
    if (typeof str !== "string") {
        return false; // we only process strings!
    }
    else {
        return !isNaN(parseInt(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
}
export function dateToTimestamp(date: string, format = 'MM-DD-YYYY'): string {
    const day = moment(date, format, true);
    if (!day.isValid()) throw new Error(`invalid date [format: ${format}]`);
    return `${day.unix()}`;
}
export function timestampToDate(timestamp: number, format = 'MM-DD-YYYY, h:mm:ss a') {
    const day = moment.unix(timestamp);
    return day.format(format);
}
export function getCurrentTimestamp(): number {
    return Math.ceil(new Date().getTime() / 1000);
}

/**
 * return success
 * @param data
 * @param {string} msg
 * @return {any}
 */
export function returnSuccess(code: string | number, msg: string, data = {}, path: string): ResopnseReturn {
    return {
        status: 1,
        code,
        msg,
        data,
        path
    }
}

/**
* Return error
* @param code
* @param msg
* @param data
* @param path
* @returns {{status: number, code: *, message: *, data: {}}}
*/
export function returnError(code: string | number, msg: string, data = {}, path: string): ResopnseReturn {
    return {
        status: 0,
        code,
        msg,
        data,
        path
    }
}