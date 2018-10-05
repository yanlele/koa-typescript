/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 18:49
 */

import {serverResponse, CommonTool} from '../common/util'
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
        let userInfo = await userMapper.getUserInfo(username, password);
        return serverResponse.createBySuccessMessageData('查询成功', userInfo);
    }

    // 用户注册
    static async signUp(username: string, password: string, confirmPassword: string, email: string) {
        if (!username) {
            return serverResponse.createByErrorMessage('没有传入用户名');
        }
        if (!password) {
            return serverResponse.createByErrorMessage('没有传入密码');
        }
        if (!confirmPassword) {
            return serverResponse.createByErrorMessage('没有传入确认密码');
        }
        if (password !== confirmPassword) {
            return serverResponse.createByErrorMessage('密码和确认密码不一致');
        }

        // 验证用户名是否正确
        let userInfo = await userMapper.checkUserName(username);
        if (userInfo['count(1)']) {
            return serverResponse.createByErrorMessage('用户名已经存在');
        }

        // 输入入库
        let responseCount = await userMapper.insertUserInfo(username, password, email);
        if (responseCount['affectedRows']) {
            return serverResponse.createBySuccessMessage('注册用户成功');
        }
        return serverResponse.createByErrorMessage('注册失败');
    }

    // 实时校验用户类型
    static async checkValid(str: string, type: string) {
        if (!str || !type) {
            return serverResponse.createByErrorMessage(ResponseCode.PARAM_ERROR)
        }
        let rowCount;

        switch (type) {
            case Check.USER_NAME:
                rowCount = await userMapper.checkEmail(str);
                if (rowCount['count(1)']) {
                    return serverResponse.createByErrorMessage('该用户邮箱已经存在');
                }
                return serverResponse.createBySuccessMessage('校验通过');
            case Check.EMAIL:
                rowCount = await userMapper.checkUserName(str);
                if (rowCount['count(1)']) {
                    return serverResponse.createByErrorMessage('该用户邮箱已经存在');
                }
                return serverResponse.createBySuccessMessage('校验通过');
            default:
                return serverResponse.createByErrorMessage('无效的验证类型');
        }
    }


    // 获取用户的问题
    static async selectQuestion(username: string) {
        if (!username) {
            return serverResponse.createByErrorMessage(ResponseCode.USER_NAME_NOT_FOUND)
        }

        let response: object = await userMapper.selectQuestionByUsername(username);
        if (CommonTool.isObjEmpty(response)) {
            return serverResponse.createByErrorMessage('没有查找到用户相关的问题')
        }
        return serverResponse.createBySuccessMessageData('获取问题成功', response);
    }

    // 验证问题是否正确
    static async checkAnswer(username: string, question: string, answer: string) {
        if (!username || !question || !answer) {
            return serverResponse.createByErrorMessage(ResponseCode.PARAM_ERROR)
        }

        let rowCount = await userMapper.checkAnswer(username, question, answer);
        if (rowCount['count(1)']) {
            // 返回成功
            return serverResponse.createBySuccessMessageData('验证成功', {
                forgetToken: CommonTool.uuid()
            })
        }
        // 返回失败
        return serverResponse.createByErrorMessage('验证失败，检查你问题和答案是否正确')
    }
}

export default UserService;