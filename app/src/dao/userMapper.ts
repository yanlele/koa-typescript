/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 19:45
 */
import {query} from "../common/db-tuil";

class UserMapper {
    // 查询用户名是否存在
    public static async checkUserName(username: string) {
        let sql: string = `select count(1) from mmall_user where username = ? limit 1`;
        return await query(sql, [username])
    }

    // 验证名户名密码是否正确
    static async checkSignIn(username: string, password: string) {
        let sql: string = `select count(1) from mmall_user where username = ? and password = ?`;
        return await query(sql, [username, password]);
    }
}


export default UserMapper;