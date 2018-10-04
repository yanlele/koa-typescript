/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 19:45
 */
import {query, checkModelResult} from "../common/db-util";
import {CommonTool} from '../common/util'

const BaseUser: string[] = ['id', 'username', 'password', 'email', 'phone', 'question', 'answer', 'role', 'create_time', 'update_time'];
const BaseUserNoPassword: string[] = ['id', 'username', 'email', 'phone', 'question', 'answer', 'role', 'create_time', 'update_time'];

class UserMapper {
    // 查询用户名是否存在
    public static async checkUserName(username: string) {
        let sql: string = `select count(1) from mmall_user where username = ? limit 1`;
        let result = await query(sql, [username]);
        result = checkModelResult(result);
        console.log(result);
        return result
    }

    // 验证名户名密码是否正确
    static async checkUserByUsernameAndPassword(username: string, password: string) {
        let sql: string = `select count(1) from mmall_user where username = ? and password = ?`;
        let result = await query(sql, [username, password]);
        result = checkModelResult(result);
        return result
    }

    // 获取用户信息
    static async getUserInfo(username: string, password: string) {
        let sql: string = `select ?? from mmall_user where username = ? and password = ?`;
        let result = await query(sql, [BaseUserNoPassword, username, password]);
        result = checkModelResult(result);
        return result;
    }

    // 保存用户信息
    static async insertUserInfo(username: string, password: string, email: string) {
        let sql: string = `insert into mmall_user set ?`;
        let param: object = {username, password, email};
        Object.assign(param, {
            role: 1,
            update_time: new Date(),
            create_time: new Date()
        });

        return await query(sql, param);
    }
}


export default UserMapper;