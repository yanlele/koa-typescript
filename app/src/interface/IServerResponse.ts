/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 19:28
 */

interface IServerResponse<T> {
    success?: boolean,
    message?: string,
    data?: T
}

export default IServerResponse