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
const _moduleTag = "accountInfoDao";
exports.GetDesktopUserSessionInfo = async (userId) => {
    let _result = false;
    const _funTag = `${_moduleTag}_GetDesktopUserSessionInfo`;
    return new Promise((resolve, reject) => {
        dbPool.GetDbWriteConnPool()
            .then((conn) => {
            conn.query("SELECT  desk.id, desk.user_id, desk.token\
                        , info.user_name, info.nickname, info.bio\
                        , info.jpush_id, info.push_kit_id, info.email\
                        , info.phone, info.photo, info.type\
                        FROM desktop_account_info desk \
                        JOIN account_info info ON desk.user_id = info.id \
                        WHERE user_id = ? ", [userId], (queryErr, results) => {
                conn.release();
                if (queryErr) {
                    return reject(_result);
                }
                return resolve([_result]);
            });
        });
    });
};
