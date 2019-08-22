"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbPool = __importStar(require("../mySqlDbConnection"));
const _moduleTag = "UserInfoDao";
exports.register = async (username, password, name, email, phone) => {
    return new Promise((resolve, reject) => {
        dbPool.GetDbWriteConnPool()
            .then((conn) => {
            conn.query(" INSERT INTO `user_info`(`username`, `password`, `name`, `email`, `mobile`) \
                        VALUES (?, ?, ?, ?, ?); ", [username, password, name, email, phone], (queryErr, results) => {
                conn.release();
                if (queryErr) {
                    return reject(queryErr);
                }
                return resolve(results.insertId);
            });
        });
    });
};
exports.login = async (username, phone, password) => {
    return new Promise((resolve, reject) => {
        dbPool.GetDbWriteConnPool()
            .then((conn) => {
            conn.query(" select * from user_info where username = ? \
                        union all  select * from user_info where mobile = ? ", [username, phone], (queryErr, results) => {
                conn.release();
                if (queryErr) {
                    return reject(queryErr);
                }
                if (results.length > 0 && results[0].password === password) {
                    return resolve(true);
                }
                return resolve(false);
            });
        });
    });
};
exports.insertMessage = async (message) => {
    return new Promise((resolve, reject) => {
        dbPool.GetDbWriteConnPool()
            .then((conn) => {
            conn.query(" INSERT INTO `message`(`message`) VALUES (?); ", [message], (queryErr, results) => {
                conn.release();
                if (queryErr) {
                    return reject(queryErr);
                }
                return resolve(results.insertId);
            });
        });
    });
};
