/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 18:42
 */


enum ResponseCode{
    USER_NAME_NOT_FOUND = '没有找到用户名',
    PASSWORD_NOT_FOUND = '没有找到密码',
    USER_NAME_OR_PASSWORD_ERROR = '用户名或者密码错误',
    USER_NAME_EXISTED = '用户名已经存在',
    SIGN_IN_SUCCESS = '登录成功',

    SUCCESS_MESSAGE = '查询成功',
}

export default ResponseCode;