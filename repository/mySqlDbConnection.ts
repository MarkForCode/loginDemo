import * as mysqlClient from "mysql";

const _moduleTag = "mySqlDbConnection";
// Connection pool with R/W splitting & Singleton pattern
class MySqlConnectionPool {
    private static _instance: MySqlConnectionPool;
    public _writablePool !: mysqlClient.Pool;
    public _readOnlyPool !: mysqlClient.Pool;

    private constructor() {

        this._writablePool = mysqlClient.createPool({
            connectionLimit : 2,
            database : 'nodesample',
            host : 'localhost', 
            multipleStatements : true,
            password : '12345678',
            port : 3306,
            user : 'root',
            charset:"utf8mb4",
        });
        this._writablePool.on("enqueue", () => {
            // console.log("mysql hugry");
        });

    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

export function GetDbWriteConnPool(): Promise<mysqlClient.PoolConnection> {
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


export let writePool: mysqlClient.Pool = MySqlConnectionPool.Instance._writablePool;
