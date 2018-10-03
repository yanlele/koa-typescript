import {serverResponse} from '../common/util'
import {ResponseCode} from '../enums'
import {IServerResponse} from '../interface'


class UserController {
    // 登录接口
    static async signIn(ctx) {
        let body: { username?: string, password?: string } = ctx.request.body;
        let username = body.username;
        let password = body.password;
        if(!username || !password) {
            return serverResponse.createErrorMessage(ResponseCode.USER_NAME_OR_PASSWORD_ERROR);
        }

        // 调用登录服务

    }
}


export default UserController