/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 18:49
 */

import {serverResponse} from '../common/util'
import {ResponseCode, Check} from '../enums'
import {IServerResponse} from '../interface'
import {userMapper} from '../dao'

class UserService {
    static async signIn(username: string, password: string) {
        // 查询用户明是否被占用
        let rowCount = await userMapper.checkUserName(username);
        if (!rowCount['count(1)']) {
            return serverResponse.createByErrorMessage(ResponseCode.USER_NAME_EXISTED);
        }

        // 直接查库，看用户名和密码是否正确
        rowCount = await userMapper.checkUserByUsernameAndPassword(username, password);
        if (!rowCount['count(1)']) {
            return serverResponse.createByErrorMessage(ResponseCode.USER_NAME_OR_PASSWORD_ERROR);
        }

        // 如果都通过了之后，那么就可以 直接返回用户信息
        let userInfo =await userMapper.getUserInfo(username, password);
        return serverResponse.createBySuccessMessageData('查询成功', userInfo);
    }

    // 用户注册
    static async signUp(username: string, password: string, confirmPassword: string, email: string) {
        if(!username) {
            return serverResponse.createByErrorMessage('没有传入用户名');
        }
        if(!password) {
            return serverResponse.createByErrorMessage('没有传入密码');
        }
        if(!confirmPassword) {
            return serverResponse.createByErrorMessage('没有传入确认密码');
        }
        if(password!==confirmPassword) {
            return serverResponse.createByErrorMessage('密码和确认密码不一致');
        }

        // 验证用户名是否正确
        let userInfo = await userMapper.checkUserName(username);
        if(userInfo['count(1)']) {
            return serverResponse.createByErrorMessage('用户名已经存在');
        }

        // 输入入库
        let responseCount = await userMapper.insertUserInfo(username, password, email);
        if(responseCount['affectedRows']) {
            return serverResponse.createBySuccessMessage('注册用户成功');
        }
        return serverResponse.createByErrorMessage('注册失败');
    }

    // 实时校验用户类型
    static  async checkValid(str: string , type: string) {
        if(!str || !type) {
            return serverResponse.createByErrorMessage(ResponseCode.PARAM_ERROR)
        }
        let response;
        if(Check.USER_NAME === type) {
            // 检测类型是邮箱
            response = await userMapper.checkEmail(str);
        }
    }
}

export default UserService;