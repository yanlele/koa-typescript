import {serverResponse, CommonTool} from '../common/util'
import {ResponseCode} from '../enums'
import {UserService} from '../service'

import {IForgetToken} from "../interface";

interface ISession {
    userInfo: object
}

class UserController {
    // 登录接口
    static async signIn(ctx){
        let body: { username?: string, password?: string } = ctx.request.body;
        let session:ISession = ctx.session;
        let username = body.username;
        let password = body.password;
        if(!username || !password) {
            return ctx.body = serverResponse.createByErrorMessage(ResponseCode.USER_NAME_OR_PASSWORD_ERROR);
        }

        // 调用登录服务
        let response:serverResponse<object> = await UserService.signIn(username, password);
        if(!response._success) {
            return ctx.body = serverResponse.createByErrorMessage(response._message);
        }

        // 查询用户是否登录
        if(CommonTool.isObjEmpty(session.userInfo)) {
            // 如果是空的说明用户没有登录
            // 缓存用户信息
            session.userInfo = response._data;
        } else {
            // 用户已经处于登录状态
            return ctx.body = serverResponse.createBySuccessMessage(ResponseCode.USER_SIGN_INED);
        }

        // 返回成功
        return ctx.body = serverResponse.createBySuccessMessage(ResponseCode.SIGN_IN_SUCCESS);
    }

    // 退出登录
    static async signOut(ctx) {
        // 检测是否有用户信息
        let session: ISession = ctx.session;
        if(CommonTool.isObjEmpty(session.userInfo)) {
            // 用户没有登录
            return ctx.body = serverResponse.createByErrorMessage(ResponseCode.USER_IS_NOT_SIGN);
        }else {
            session.userInfo = null;
            return ctx.body = serverResponse.createBySuccessMessage(ResponseCode.SIGN_OUT_SUCCESS);
        }
    }

    // 登录状态获取用户信息
    static async getUserInfo(ctx) {
        let session:ISession = ctx.session;
        if(CommonTool.isObjEmpty(session.userInfo)) {
            // 用户没有登录
            return ctx.body = serverResponse.createByErrorMessage(ResponseCode.USER_IS_NOT_SIGN);
        } else {
            return ctx.body = serverResponse.createBySuccessMessageData('获取用户信息成功', session.userInfo);
        }
    }

    // 用户注册
    static async signUp(ctx) {
        let body = ctx.request.body;
        if(CommonTool.isObjEmpty(body)) {
            return ctx.body = serverResponse.createByErrorMessage('没有填写注册信息')
        }
        let username: string = body.username;
        let password: string  = body.password;
        let confirmPassword: string = body.confirmPassword;
        let email: string = body.email;

        let response: serverResponse<object> = await UserService.signUp(username, password, confirmPassword, email);
        return ctx.body = response;
    }

    // 实时校验
    static async checkValid(ctx) {
        let body = ctx.request.query;
        let str: string = body.str;
        let type: string = body.type;
        return ctx.body =await UserService.checkValid(str, type);
    }


    // 忘记密码， 获取问题
    static async forgetGetQuestion(ctx) {
        let body = ctx.request.query;
        let username:string = body.username;
        let response = await UserService.selectQuestion(username);
        return ctx.body =await UserService.selectQuestion(username);
    }

    // 通过回答问题，获取该用户唯一标示的token
    static async forgetCheckAnswer(ctx) {
        let body = ctx.request.query;
        let username: string  = body.username;
        let question: string = body.question;
        let answer: string = body.answer;

        let response = await UserService.checkAnswer(username, question, answer);
        if(response._success) {
            let session:ISession = ctx.session;
            let userInfo: object = session.userInfo;
            Object.assign(userInfo, {
                forgetToken: response._data.forgetToken
            });
            session.userInfo = userInfo;
        }

        return ctx.body = response;
    }


    // 通过问题答案和token， 来重置密码
    static async forgetRestPassword(ctx) {
        let body = ctx.request.query;
        let username: string  = body.username;
        let passwordNew: string = body.passwordNew;
        let forgetToken: string = body.forgetToken;

        if(!username || !passwordNew || !forgetToken) {
            return ctx.body = serverResponse.createByErrorMessage(ResponseCode.PARAM_ERROR)
        }

        // 验证forgetToken是否相同
        let session = ctx.session;
        if(CommonTool.isObjEmpty(session.userInfo)) {
            return ctx.body = serverResponse.createByErrorMessage(ResponseCode.USER_IS_NOT_SIGN)
        }
        let response;
        if(session.userInfo && session.userInfo.forgetToken === forgetToken) {
            // token 验证通过 调用服务层
            response  = await UserService.forgetResetPassword(username, passwordNew);
            if(response._success) {
                // 清空session中的forgetToken
                let userInfo: object = session.userInfo;
                Object.assign(userInfo, {
                    forgetToken: null
                });
                session.userInfo = userInfo;
            }
            return ctx.body = response
        }
        return ctx.body = serverResponse.createByErrorMessage('token验证失败');
    }


    // 登录状态修改密码
    static async resetPassword(ctx) {
        let body = ctx.request.body;
        let passwordOld: string = body.passwordOld;
        let passwordNew: string = body.passwordNew;
        let username: string = body.username;

        let session = ctx.session;
        if(session.userInfo && session.userInfo.username === username) {
            return ctx.body = await UserService.resetPassword(username, passwordNew, passwordOld);
        }
        return ctx.body = serverResponse.createByErrorMessage('当前用户没有登录');
    }


    // 更新用户信息
    static async updateInformation(ctx) {
        let body = ctx.reqeust.body;
        let user = body.user;
        let userInfo = ctx.session.userInfo;
        if(!userInfo) {
            return serverResponse.createByErrorMessage('用户没有登录');
        }
        // 不允许更改id和username
        user.id = userInfo.id;
        user.username = userInfo.username;

        return ctx.body = UserService.updateInformation(userInfo);
    }

    // 通过主键id查询的用户信息
    static async getInformation(ctx) {
        let userInfo = ctx.session.userInfo;
        if(CommonTool.isObjEmpty(userInfo)) {
            return serverResponse.createByErrorMessage(ResponseCode.USER_IS_NOT_SIGN)
        }
        return UserService.getInformation(userInfo.id);
    }
}


export default UserController