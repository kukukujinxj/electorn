module.exports = {
    //源数据库
    sourceDatabase: {
        // dbName: 'hljzyydx',
        // host: '192.168.106.61',
        // port: 3307,
        // user: 'root',
        // password: 'cnki2019'
        dbName: 'hljzyydxyf',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root'
    },
    //目标数据库
    targetDatabase: {
        dbName: 'publicbase',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root'
    },
    //是否覆盖唯一键冲突数据
    override: false
}