const moment = require('moment');
module.exports = {
    isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    },
    dateToTimestamp(date, format = 'MM-DD-YYYY') {
        const day = moment(date, format, true);
        if (!day.isValid()) throw new Error(`invalid date [format: ${format}]`);
        return day.unix();
    },
    timestampToDate(timestamp, format = 'MM-DD-YYYY, h:mm:ss a') {
        const day = moment.unix(timestamp);
        return day.format(format);
    },
    getCurrentTimestamp() {
        return Math.ceil(new Date().getTime() / 1000);
    },
    /**
    * Return error
    * @param code
    * @param msg
    * @param data
    * @param path
    * @returns {{status: number, code: *, message: *, data: {}}}
    */
    returnError(code, msg, data = {}, path) {
        return {
            status: 0,
            code,
            msg,
            data,
            path
        }
    },

    /**
     * return success
     * @param data
     * @param {string} msg
     * @return {any}
     */
    returnSuccess(code, msg, data, path) {
        return {
            status: 1,
            code,
            msg,
            data,
            path
        }
    },

}