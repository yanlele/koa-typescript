/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-04 10:12
 */

class CommonTool {
    static serialize(data:object): string {
        let str = '';
        for(let key in data) {
            str += key + '=' + encodeURIComponent(data[key]) + '&';
        }
        str = str.replace(/&$/, '');
        return str;
    }

    static isObjEmpty(obj):boolean {
        // Speed up calls to hasOwnProperty
        let hasOwnProperty = Object.prototype.hasOwnProperty;

        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== 'object') return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (let key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    static uuid():string {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        let uuid = s.join("");
        return uuid;
    }
}

export default CommonTool;