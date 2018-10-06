/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-06 21:12
 */

import {UserService} from '../../service'
import {serverResponse} from '../../common/util'
import {Role} from '../../enums'

interface ISignIn{
    username: string ,
    password: string
}

class UserManageController {
    public static async  SignIn(ctx) {
        let body: ISignIn = ctx.request.query;
        let username: string = body.username;
        let password: string = body.password;
        let session = ctx.session;
        // 用户登录
        let response =await UserService.signIn(username, password);
        if(response._success) {
            let user = response._data;
            if(user['role'] === Role.ROLE_ADMIN) {
                session.userInfo = user;
                return response;
            }else {
                return serverResponse.createByErrorMessage('不是管理员，无法登录')
            }
        }
        return response;
    }
}


export default UserManageController;