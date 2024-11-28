const mysql = require('mysql2');

// 数据库连接配置
const pool = mysql.createPool({
    host: 'localhost',     // 数据库主机
    user: 'root',          // 用户名
    password: '2066154879Ys', // 密码
    database: 'py_sql', // 数据库名称
    //   waitForConnections: true, // 默认true，控制当连接池没有可用连接时，是否让新的连接请求进入等待队列。
    //   connectionLimit: 10, // 默认：10，设置连接池中最大连接数。如果当前活跃的连接数达到此限制，新请求将根据waitForConnections进行排队/直接返回错误
    //   queueLimit: 0 // 默认0（表示不限制队列长度）。限制等待队列的最大长度，如果队列中的请求数达到此限制，新的连接请求会直接返回错误。
});

// 导出 `Promise` 化的连接池
const promisePool = pool.promise();

// 检测连接状态
async function checkConnection() {
    try {
        await promisePool.query('SELECT 1'); // 简单查询
        console.log('数据库连接正常');
    } catch (err) {
        console.error('数据库连接失败:', err.message);
    }
}
checkConnection(); // 应用启动时检测

module.exports = promisePool;
