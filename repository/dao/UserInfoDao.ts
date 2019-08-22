import { isNullOrUndefined } from "util";
import * as dbPool from "../mySqlDbConnection";
import _ from "lodash";

const _moduleTag = "UserInfoDao";

export let register = async (username: string, password: string, name: string, email: string, phone: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        dbPool.GetDbWriteConnPool()
        .then((conn) => {
            conn.query(" INSERT INTO `user_info`(`username`, `password`, `name`, `email`, `mobile`) \
                        VALUES (?, ?, ?, ?, ?); ",
                       [username, password, name, email, phone],
                       (queryErr, results) => {
                        conn.release();
                        if (queryErr) {
                            return reject(queryErr);
                        }
                        return resolve(results.insertId);
            });
        });
    });
};


export let login = async (username: string, phone: string ,  password: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        dbPool.GetDbWriteConnPool()
        .then((conn) => {
            conn.query(" select * from user_info where username = ? \
                        union all  select * from user_info where mobile = ? ",
                       [username, phone],
                       (queryErr, results) => {
                        conn.release();
                        if (queryErr) {
                            return reject(queryErr);
                        }
                        if(results.length > 0 && results[0].password === password) {
                            return resolve(true);
                        }
                        return resolve(false);
            });
        });
    });
};

export let insertMessage = async (message: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        dbPool.GetDbWriteConnPool()
        .then((conn) => {
            conn.query(" INSERT INTO `message`(`message`) VALUES (?); ",
                       [message],
                       (queryErr, results) => {
                        conn.release();
                        if (queryErr) {
                            return reject(queryErr);
                        }
                        return resolve(results.insertId);
            });
        });
    });
};