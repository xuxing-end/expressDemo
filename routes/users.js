var express = require('express');
var router = express.Router();
const db = require('../lib/db');


// 测试
router.get('/getList', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM user_ml');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Server Error: ', message: '数据库异常' }); // 单独处理异常
    }
});


// 添加用户信息
router.post('/addUserInfo', async (req, res, next) => {
    try {
        const requiredFields = ['username', 'password'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        // 判断是否有缺少的字段
        if (missingFields.length > 0) {
            return res.status(400).json({
                code: 400,
                message: `缺少必要参数：${missingFields.join(', ')}`
            });
        }

        const { id, username, password } = req.body;

        // 执行更新操作
        const [rows] = await db.query(`INSERT INTO user_ml (username, password) VALUES ('${username}', '${password}')`);

        res.json({
            code: 200,
            message: '添加成功'
        });
    } catch (err) {
        next(err); // 掉通用异常处理
    }
});

// 删除用户信息
router.post('/deleteUserInfo', async (req, res, next) => {
    try {
        const requiredFields = ['id'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        // 判断是否有缺少的字段
        if (missingFields.length > 0) {
            return res.status(400).json({
                code: 400,
                message: `缺少必要参数：${missingFields.join(', ')}`
            });
        }

        const { id, username, password } = req.body;

        // 执行更新操作
        const [rows] = await db.query(`DELETE FROM user_ml WHERE id = ${id}`);

        res.json({
            code: 200,
            message: '删除成功'
        });
    } catch (err) {
        next(err); // 掉通用异常处理
    }
});

// 修改用户信息
router.post('/updatUserInfo', async (req, res, next) => {
    try {
        const requiredFields = ['id', 'username', 'password'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        // 判断是否有缺少的字段
        if (missingFields.length > 0) {
            return res.status(400).json({
                code: 400,
                message: `缺少必要参数：${missingFields.join(', ')}`
            });
        }

        const { id, username, password } = req.body;

        // 执行更新操作
        const [rows] = await db.query(`UPDATE user_ml SET username = '${username}', password = '${password}' WHERE id = ${id}`);

        // 如果没有更新任何行，提示用户不存在
        if (rows.affectedRows === 0) {
            return res.status(404).json({
                code: 404,
                message: '未找到对应的用户，更新失败'
            });
        }

        res.json({
            code: 200,
            message: '修改成功'
        });
    } catch (err) {
        next(err); // 掉通用异常处理
    }
});

// 查询用户
router.get('/getUserList', async (req, res, next) => {
    try {
        const paramData = req.body;
        const [rows] = await db.query('SELECT * FROM user_ml');
        res.json(rows);
    } catch (err) {
        next(err); // 掉通用异常处理
    }
});

module.exports = router;
