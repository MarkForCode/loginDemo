"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlClient = __importStar(require("mysql"));
const _moduleTag = "mySqlDbConnection";
// Connection pool with R/W splitting & Singleton pattern
class MySqlConnectionPool {
    constructor() {
        this._writablePool = mysqlClient.createPool({
            connectionLimit: 2,
            database: 'nodesample',
            host: 'localhost',
            multipleStatements: true,
            password: '12345678',
            port: 3306,
            user: 'root',
            charset: "utf8mb4",
        });
        this._writablePool.on("enqueue", () => {
            // console.log("mysql hugry");
        });
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
function GetDbWriteConnPool() {
    const _funTag = _moduleTag + "_GetDbWriteConnPool";
    const _pool = MySqlConnectionPool.Instance;
    return new Promise((resolve, reject) => {
        _pool._writablePool.getConnection((err, connection) => {
            if (err) {
                return reject();
            }
            return resolve(connection);
        });
    });
}
exports.GetDbWriteConnPool = GetDbWriteConnPool;
exports.writePool = MySqlConnectionPool.Instance._writablePool;
