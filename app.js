var express = require('express');
var app = express();
var router = require('./router/router.js');
var db = require('./models/db.js');
var token = require('./models/token.js');


//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post('/addUser',router.addUser);//用户注册
app.post('/userLogin',router.userLogin);//用户登录
app.post('/addDoctor',router.addDoctor);//医生注册
app.post('/doctorLogin',router.doctorLogin);//医生登录

app.use('/',token.checkToken);//验证token是否过期的中间件

app.post('/changeUserInfo',router.changeUserInfo);//修改用户信息
app.post('/changeDoctorInfo',router.changeDoctorInfo);//修改医生信息
app.post('/orderDoctor',router.orderDoctor);//预约医生

app.get('/findDoctor',router.findDoctor);//用户根据地区、医院和科室查看医生
app.get('/findDoctorDetail/:id',router.findDoctorDetail);//用户根据id查看医生，包括其他人对该医生的所有评价
app.get('/userFindOrder/:status',router.userFindOrder);//用户根据状态查看我的预约

app.get('/doctorFindOrder/:status',router.doctorFindOrder);//医生根据状态查看我的预约
app.post('/acceptUser',router.acceptUser);//医生接受用户的预约
app.post('/rejectUser',router.rejectUser);//医生拒绝用户的预约
app.post('/completeOrder',router.completeOrder);//用户点击预约完成，进入评价页面

app.post('/commentDoctor',router.commentDoctor);//用户评价医生


app.listen(80,'192.168.1.103');