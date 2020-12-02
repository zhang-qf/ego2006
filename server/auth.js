const express = require("express");
const router = express.Router();
const sqlFn = require("./mysqlConfig");
const jwt = require("jsonwebtoken");
const config = require("./config");
const url = require("url");
const fs = require("fs");
const multer = require("multer");

// 登陆
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "select * from user where `username`=? and `password`=?";
    const arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username
            }, config.jwtSecret)
            res.status(200).json(token)
        } else {
            res.status(401).json({
                errors: "用户名密码错误"
            })
        }

    })
})

// 注册
router.post("/register", (req, res) => {
    const { username, password,email } = req.body;
    const sql = "insert into user values(null,?,?,?)";
    const arr = [username, password,email]
    sqlFn(sql, arr, result => {
        if(result.affectedRows >0){
            res.status(200).json({
                msg:"注册成功"
            })
        }else{
            res.status(400).json({
                msg:"注册失败"
            })
        }
    })
})

// 商品查询
router.get("/backend/item/selectTbItemAllByPage", (req, res) => {
    // 分页
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from project order by id desc limit 10 offset " + (page - 1) * 10;
    const arr = [page];
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(400).json({
                msg: "暂无数据"
            })
        }
    })
})

// 分页总数
router.get("/total", (req, res) => {
    const sql = "select count(*) from project where id";
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "无更多数据"
            })
        }
    })
})

// 产品增加
router.get("/backend/item/insertTbItem", (req, res) => {
    /**
     * 获取参数
     */
    var title = url.parse(req.url, true).query.title || "";
    var cid = url.parse(req.url, true).query.cid || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.desc || "";
    var image = url.parse(req.url, true).query.image || "";
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)";
    var arr = [title, image, sellPoint, price, cid, num, desc];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

/**
 * 模糊查询接口
 */
router.get("/search", (req, res) => {
    const search = url.parse(req.url, true).query.search
    const sql = "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'";
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(400).json({
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 上传图片
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

/**
 * 类目选择
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId", (req, res) => {
    const id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from category where id=?"
    const arr = [id]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 商品删除
 */
router.get("/backend/item/deleteItemById", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "delete from project where id=?"
    const arr = [id]
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 预更新
 */
router.get("/backend/item/preUpdateItem", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "select * from project where id=?";
    sqlFn(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "预更新失败"
            })
        }
    })
})

/**
 * 修改
 */

router.get("/backend/item/updateTbItem", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    var title = url.parse(req.url, true).query.title || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.desc || "";
    var image = url.parse(req.url, true).query.image || "";
    var cid = url.parse(req.url,true).query.cid;
    var sql = "update project set title=?,sellPoint=?,cid=?,price=?,num=?,descs=?,image=? where id=?";
    var arr = [title, sellPoint, cid,price, num, desc, image, id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 单一类目数据获取
 */
router.get("/preCategory", (req, res) => {
    var cid = url.parse(req.url, true).query.cid;
    const sql = "select * from category where cid=?";
    sqlFn(sql, [cid], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "获取失败"
            })
        }
    })
})

/**
 * 规格参数 读取数据
 */
router.get("/backend/itemParam/selectItemParamAll", (req, res) => {
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from params order by id desc limit 10 offset " + (page - 1) * 10;
    sqlFn(sql, [page], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 规格参数 查询
 */
router.get("/params/search", (req, res) => {
    var search = url.parse(req.url, true).query.search;
    const sql = "select * from params where concat(`paramData`) like '%" + search + "%'";
    sqlFn(sql, [search], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

/**
 * 规格参数删除
 */
router.get("/params/delete", (req, res) => {
    var id = url.parse(req.url, true).query.id;
    const sql = "delete from params where id=?"
    sqlFn(sql, [id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 规格参数总页数
 */

router.get("/params/total", (req, res) => {
    const sql = "select count(*) from params where id";
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "无更多数据"
            })
        }
    })
})

/**
 * 规格参数 添加
 */
router.get("/backend/itemParam/insertItemParam", (req, res) => {
    var itemCatId = url.parse(req.url, true).query.itemCatId;
    var paramsContent = url.parse(req.url, true).query.content;
    var sql = "insert into params values (null,?,?)";
    sqlFn(sql, [itemCatId, paramsContent], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

/**
 * 获取规格参数数据添加到产品
 */
router.get("/product/parmas/paramsItem", (req, res) => {
    var cid = url.parse(req.url, true).query.cid;
    var sql = "select * from params where itemCatId=?"
    sqlFn(sql, [cid], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "无更多数据"
            })
        }
    })
})
/**
 * 内容分类管理 查询导航
 */
router.get("/content/selectContentCategoryByParentId", (req, res) => {
    const id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from content where id=?";
    sqlFn(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 内容分类管理 增加子导航
 */
router.get("/content/insertContentCategory", (req, res) => {
    const pid = url.parse(req.url, true).query.pid;
    const name = url.parse(req.url, true).query.name;
    const currentId = Math.floor(Math.random() * 10000)
    const sql = "insert into content values (?,?,?)"
    sqlFn(sql, [pid, name, currentId], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

/**
 *  内容分类管理 修改子导航
 */
router.get("/content/updateContentCategory", (req, res) => {
    const pid = url.parse(req.url, true).query.pid;
    const name = url.parse(req.url, true).query.name;
    const sql = "update content set name=? where pid=?"
    sqlFn(sql, [name, pid], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 内容分类管理 删除子导航
 */
router.get("/content/deleteContentCategoryById", (req, res) => {
    const pid = url.parse(req.url, true).query.pid;
    const sql = "delete from content where pid=?"
    sqlFn(sql, [pid], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 内容分类管理 内容增加
 */
router.get("/content/insertTbContent",(req,res) =>{
    const pid = url.parse(req.url, true).query.pid;
    const name = url.parse(req.url, true).query.name;
    const contentUrl = url.parse(req.url, true).query.url;
    const image = url.parse(req.url, true).query.image;
    const sql = "insert into contentinfo values(null,?,?,?,?)";
    sqlFn(sql,[pid,name,contentUrl,image],result =>{
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


/**
* 内容分类管理 内容删除
*/

router.get("/content/deleteContentByIds",(req,res) =>{
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from contentinfo where id=?"
    sqlFn(sql,[id],result =>{
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

/**
 * 内容分类管理 内容查询
 */
router.get("/content/selectTbContentAllByCategoryId", (req, res) => {
    const pid = url.parse(req.url, true).query.pid;
    const sql = "select * from contentinfo where pid=?"
    sqlFn(sql, [pid], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

module.exports = router;