/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-03 19:45
 */
import {query, checkModelResult} from "../common/db-util";
import {CommonTool} from '../common/util'
import {userMapper} from "./index";

const BaseUser: string[] = ['id', 'username', 'password', 'email', 'phone', 'question', 'answer', 'role', 'create_time', 'update_time'];
const BaseUserNoPassword: string[] = ['id', 'username', 'email', 'phone', 'question', 'answer', 'role', 'create_time', 'update_time'];

class UserMapper {
    // 查询用户名是否存在
    public static async checkUserName(username: string) {
        let sql: string = `select count(1) from mmall_user where username = ? limit 1`;
        let result = await query(sql, [username]);
        result = checkModelResult(result);
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

    // 查询邮箱是否正确
    static async checkEmail(email: string) {
        let sql: string = `select count(1) mmall_user where email = ?`;
        let result = await query(sql, [email]);
        result = checkModelResult(result);
        return result;
    }

    // 通过用户名来查找问题
    static async selectQuestionByUsername(username: string) {
        let sql: string = `select question from mmall_user where username = ?`;
        let result = await query(sql, [username]);
        result = checkModelResult(result);
        return result;
    }


    // 通过用户名，问题， 验证用户是否存在
    static async checkAnswer(username: string , question: string , answer: string) {
        let sql: string  = `select count(1) from mmall_user where username=? and question=? and answer=?`;
        let result = await query(sql, [username, question, answer]);
        result = checkModelResult(result);
        return result;
    }

    // 通过用户名修改密码
    static async updatePasswordByUsername(username: string, passwordNew: string) {
        let sql: string = `update mmall_user set ? where username = ?`;
        let param: object = {
            password: passwordNew
        };
        return await query(sql, [param, username]);
    }

    // 通过用户名和旧密码，更改新的密码
    static async updatePasswordByUsernameAndPasswordOld(username: string ,passwordNew: string ,passwordOld: string) {
        let sql: string = `update mmall_user set ? where username=? and password=?`;
        let param: object = {
            password: passwordNew
        };
        return await query(sql, [param, username, passwordNew])
    }

    // 通过id 验证是否有emial
    static async checkEmailByUserId(email: string, id: string) {
        let sql: string = `select count(1) from mmall_user where email=? and id!=?`;
        let result = await query(sql, [email, id]);
        return checkModelResult(result);
    }

    // 更新用户相关的信息
    static async updateUserInfo(user) {
        let sql : string  = `update mmall_user set ? where id=?`;
        return await query(sql, [user, user.id]);
    }

    // 通过id查询用户所有信息
    static async selectUserInfo(id: string) {
        let sql: string = `select ?? from mmall_user where id=?`;
        let result = await query(sql, [BaseUser, id]);
        return checkModelResult(result);
    }
}


export default UserMapper;