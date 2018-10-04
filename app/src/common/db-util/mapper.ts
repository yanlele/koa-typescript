/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-02 22:21
 */

import config from '../../../config'
import * as mysql from 'mysql'
import {Pool, Query} from "mysql";

const mySqlConfig = {
    host: config.mysql.HOST,
    user: config.mysql.USERNAME,
    password: config.mysql.PASSWORD,
    database: config.mysql.DATABASE
};

const pool: Pool = mysql.createPool(mySqlConfig);

let query = function(sql: string, values: Array<string|object> | object): Promise<Query> {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release();
                })
            }
        })
    })
};


// 防止sql注入
function escape(value: string): string {
    return pool.escape(value);
}

let insertData = function(table: string| string[], values: string) {
    let sql = `insert into ?? set ?`;
    return query(sql, [table, values])
};

let select = function( keys: string | string[], table: string| string[]) {
    let sql = `select ?? from ??`;
    return query(sql, [keys, table])
};


export {
    query,
    escape,
    insertData,
    select
}