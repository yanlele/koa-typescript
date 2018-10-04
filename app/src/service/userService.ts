/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 18:49
 */

import {serverResponse} from '../common/util'
import {ResponseCode} from '../enums'
import {IServerResponse} from '../interface'
import {userMapper} from '../dao'

class UserService {
    static async signIn(username: string, password: string){
        // 查询用户明是否被占用
        let response: serverResponse<object>;
        let rowCount = await userMapper.checkUserName(username);
        if(rowCount) {
            return serverResponse.createByErrorMessage(ResponseCode.USER_NAME_EXISTED);
        }

        // 直接查库，看用户名和密码是否正确
        rowCount = await userMapper.checkUserByUsernameAndPassword(username, password);
        if(!rowCount) {
            return serverResponse.createByErrorMessage(ResponseCode.USER_NAME_OR_PASSWORD_ERROR);
        }

        // 如果都通过了之后，那么就可以 直接返回用户信息
        let userInfo =  userMapper.getUserInfo(username, password);
        response =  serverResponse.createBySuccessMessageData('查询成功', userInfo);
        return response;
    }
}

export default UserService;