/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 18:16
 */

import {IServerResponse} from '../../interface'

let defaultResponse = {
    success: true
};

let defaultError = {
    success: false
};

class ServerResponse<T> {
    static createSuccessMessage<T>(message?: string, data?: T):IServerResponse<T> {
        if(message && !data) {
            return Object.assign(defaultResponse, {
                message
            });
        }

        if(data && message) {
            return Object.assign(defaultResponse, {
                data,
                message
            })
        }

        if(data) {
            return Object.assign(defaultResponse, {
                data
            })
        }
        return defaultResponse
    }

    static createErrorMessage<T> (message?: string, data?: T):IServerResponse<T> {
        if(message && !data) {
            return Object.assign(defaultError, {
                message
            })
        }

        if(data && message) {
            return Object.assign(defaultError, {
                data,
                message
            })
        }

        if(data) {
            return Object.assign(defaultError, {
                data
            })
        }
        return defaultError
    }
}

export default ServerResponse;