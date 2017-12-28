

var express = require('express');
var router = express.Router();

//const io = require('socket.io')();
// or
// const Server = require('socket.io');
// const io = new Server();

const app = express();
const http = require("http").Server(app);
const socket = require("socket.io");
const io = socket(http);


io.on('connection', function(socket) {
    //接收并处理客户端的hi事件
		console.log('服务端socket connected')
    socket.on('hi', function(data) {
        console.log("我接受到了数据："+data);

        //触发客户端事件c_hi
        socket.emit('c_hi','hello too!')
    })

    //断开事件
    socket.on('disconnect', function(data) {
        console.log('断开',data)
        socket.emit('c_leave','离开');
        //socket.broadcast用于向整个网络广播(除自己之外)
        //socket.broadcast.emit('c_leave','某某人离开了')
    })

});

// 注册
router.use('/regist', require(__dirname + '/account/regist'));

//登录
router.use('/login', require(__dirname + '/account/login'));

// 找回密码
router.use('/forgetPwd', require(__dirname + '/account/forgetPwd'));

// 个人中心
router.use('/personal', require(__dirname + '/personal/index'));

// 个人资料修改
router.use('/personalEdit', require(__dirname + '/personal/personal-edit'));

// 首页
router.use('/globalCoupon', require(__dirname + '/global-coupon/index'));

// 全球优惠列表页
router.use('/globalCouponList', require(__dirname + '/global-coupon-list/index'));

// 领取优惠券
router.use('/getCoupon', require(__dirname + '/get-coupon/index'));

module.exports = router;
