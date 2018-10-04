import {serverResponse} from '../common/util'
import {ResponseCode} from '../enums'
import {UserService} from '../service'


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
        let response = await UserService.signIn(username, password);
        if(!response.success) {
            return serverResponse.createErrorMessage(response.message);
        }
        // 返回成功
        return serverResponse.createSuccessMessage(ResponseCode.SIGN_IN_SUCCESS);
    }
}


export default UserController