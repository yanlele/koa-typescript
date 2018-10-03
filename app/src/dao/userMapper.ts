/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 19:45
 */
import {query} from "../common/db-tuil";

const BaseUser: string[] =  ['id' , 'username', 'password', 'email', 'phone', 'question', 'answer', 'role', 'create_time', 'update_time'];
const BaseUserNoPassword: string[] = ['id' , 'username', 'email', 'phone', 'question', 'answer', 'role', 'create_time', 'update_time'];

class UserMapper {
    // 查询用户名是否存在
    public static async checkUserName(username: string) {
        let sql: string = `select count(1) from mmall_user where username = ? limit 1`;
        return await query(sql, [username])
    }

    // 验证名户名密码是否正确
    static async checkUserByUsernameAndPassword(username: string, password: string) {
        let sql: string = `select count(1) from mmall_user where username = ? and password = ?`;
        return await query(sql, [username, password]);
    }

    // 获取用户信息
    static async getUserInfo(username: string , password: string) {
        let sql: string = `select ?? from mmall_user where username = ? and password = ?`;
        return await query(sql, [BaseUserNoPassword, username, password])
    }
}


export default UserMapper;