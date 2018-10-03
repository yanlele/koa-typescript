import {serverResponse} from '../common/util'
import {ResponseCode} from '../enums'
import {IServerResponse} from '../interface'



class UserController {
    // 登录接口
    static async signIn(ctx) {
        let body: {username: string, password: string} = ctx.request.body;
        let {username = '', password = ''} = body;
        if(!username || !password) {
            serverResponse.createErrorMessage(ResponseCode.USER_NAME_OR_PASSWORD_ERROR);
        }

        // 调用登录服务


    }
}

interface Session {
    setSession: Test
}

interface Test {
    name: string,
    age: number
}

export default UserController