module.exports = {
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
    returnSuccess(code, msg, data,path) {
        return {
            status: 1,
            code,
            msg,
            data,
            path
        }
    },
}