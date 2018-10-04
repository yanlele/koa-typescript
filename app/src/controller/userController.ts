import {serverResponse, CommonTool} from '../common/util'
import {ResponseCode} from '../enums'
import {UserService} from '../service'

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
}


export default UserController