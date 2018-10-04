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
            return serverResponse.createByErrorMessage(ResponseCode.USER_NAME_OR_PASSWORD_ERROR);
        }

        // 调用登录服务
        let response = await UserService.signIn(username, password);
        if(!response.success) {
            return serverResponse.createByErrorMessage(response.message);
        }

        // 查询用户是否登录
        if(CommonTool.isObjEmpty(session.userInfo)) {
            // 如果是空的说明用户没有登录
            // 缓存用户信息
            session.userInfo = response.data;
        } else {
            // 用户已经处于登录状态
            return serverResponse.createBySuccessMessage(ResponseCode.USER_SIGN_INED);
        }

        // 返回成功
        return serverResponse.createBySuccessMessage(ResponseCode.SIGN_IN_SUCCESS);
    }

    // 退出登录
    static async signOut(ctx) {
        // 检测是否有用户信息
        let session: ISession = ctx.session;
        if(CommonTool.isObjEmpty(session.userInfo)) {
            // 用户没有登录
            return  serverResponse.createByErrorMessage(ResponseCode.USER_IS_NOT_SIGN);
        }else {
            session.userInfo = null;
            return serverResponse.createBySuccessMessage(ResponseCode.SIGN_OUT_SUCCESS);
        }
    }

    // 登录状态获取用户信息
    static async getUserInfo(ctx) {
        let session:ISession = ctx.session;
        if(CommonTool.isObjEmpty(session.userInfo)) {
            // 用户没有登录
            return  serverResponse.createByErrorMessage(ResponseCode.USER_IS_NOT_SIGN);
        } else {
            return serverResponse.createBySuccessMessageData('获取用户信息成功', session.userInfo);
        }
    }
}


export default UserController