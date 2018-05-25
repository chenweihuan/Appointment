var user = require('./../models/user.js')
var token = require('./../models/token.js')
var doctor = require('./../models/doctor.js')
var relation = require('./../models/relation.js');
var formidable = require('formidable');

// 用户注册
exports.addUser = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        user.addUser(fields,function(result){
            res.json(result);
        })
    })
}
// 用户登录
exports.userLogin = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        user.userLogin(fields,function(result){
            res.json(result);
        })
    })
}
// 修改用户信息
exports.changeUserInfo = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        user.changeUserInfo(fields,function(result){
            res.json(result);
        })
    })
}

// 医生注册
exports.addDoctor = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        doctor.addDoctor(fields,function(result){
            res.json(result);
        })
    })
}
// 医生登录
exports.doctorLogin = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        doctor.doctorLogin(fields,function(result){
            res.json(result);
        })
    })
}
// 修改医生信息
exports.changeDoctorInfo = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        doctor.changeDoctorInfo(fields,function(result){
            res.json(result);
        })
    })
}

// 预约医生
exports.orderDoctor = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        relation.orderDoctor(fields,function(result){
            res.json(result);
        })
    })
}
// 用户查找我的预约
exports.userFindOrder = function(req,res,next){
    relation.userFindOrder({status:req.params["status"]},function(result){
        res.json(result);
    })
}
// 医生根据状态查看我的预约
exports.doctorFindOrder = function(req,res,next){
    relation.doctorFindOrder({status:req.params["status"]},function(result){
        res.json(result);
    })
}
// 用户根据id查看医生，包括其他人对该医生的所有评价
exports.findDoctorDetail = function(req,res,next){
    relation.findDoctorDetail({id:req.params["id"]},function(result){
        res.json(result);
    })
}
// 医生接受用户预约
exports.acceptUser = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        relation.acceptUser(fields,function(result){
            res.json(result);
        })
    })
}
// 医生拒绝用户预约
exports.rejectUser = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        relation.rejectUser(fields,function(result){
            res.json(result);
        })
    })
}
// 用户完成预约，进入评价页面
exports.completeOrder = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        relation.completeOrder(fields,function(result){
            res.json(result);
        })
    })
}
// 用户评价医生
exports.commentDoctor = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        relation.commentDoctor(fields,function(result){
            res.json(result);
        })
    })
}
// //用户根据地区、医院和科室查看医生
exports.findDoctor = function(req,res,next){
    doctor.findDoctor(req.query,function(result){
        res.json(result);
    })
}