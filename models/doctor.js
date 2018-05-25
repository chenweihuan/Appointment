var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var token = require('./../models/token.js')

//schema
var doctorSchema = new mongoose.Schema({
    phone : String,
    password : String,
    sex:String,
    age:Number,
    realName:String,
    area:String,//地区
    hospital:String,//医院
    department:String,//科室
});

//索引
doctorSchema.index({ "phone": 1});
// 医生注册
doctorSchema.statics.addDoctor = function(userInfo,callback){
    // 先通过电话号码查找用户，如果已存在就返回-1
    Doctor.find({phone:userInfo.phone}, function(err, animals) {
        if(animals.length !== 0){//医生已存在
            let callbackJson = {
                message: 'your phone is exist!',
                info:'-1'
            }
            callback(callbackJson);
        }else{//医生未存在，创建医生
            Doctor.create(userInfo,function (param) { 
                let callbackJson = {
                    message: 'create doctor success!',
                    info:'1'
                }
                callback(callbackJson);
            })
        }
    });
}
// 医生登录
doctorSchema.statics.doctorLogin = function(userInfo,callback){
    // 先通过电话号码查找医生，如果已存在就返回-1
    console.log(userInfo)
    Doctor.find({phone:userInfo.phone}, function(err, results) {
        if(results.length == 0){//医生未注册
            let callbackJson = {
                message: 'your phone is not exist!',
                info:'-1'
            }
            callback(callbackJson);
        }else{//医生已存在，验证密码
            if(userInfo.password == results[0].password){
                //生成token
                const token = jwt.sign({id: results[0].id} 
                    ,'user_pass_xxx'//随便一点内容，撒盐：加密的时候混淆
                    ,{expiresIn: 1800 //半小时有效时间
                });
                // 返回前端token
                let callbackJson = {
                    message: 'login success',
                    info:'1',
                    token:token
                }
                callback(callbackJson);
            }else{
                let callbackJson = {
                    message: 'password is wrong',
                    info:'2'
                }
                callback(callbackJson);
            }
        }
    });
}
//修改医生信息
doctorSchema.statics.changeDoctorInfo = function(userInfo,callback){ 
    Doctor.update({"_id":token.id},userInfo,function(err,ca){
        let callbackJson = {
            message: 'change success',
            info:'1'
        }
        callback(callbackJson);
    });
}
//查找医生信息
doctorSchema.statics.findDoctor = function(userInfo,callback){ 
    Doctor.find(userInfo,function(err,results){
        let callbackJson = {
            message: 'find doctor success',
            info:'1',
            data:results
        }
        callback(callbackJson);
    });
}


//model
var Doctor = mongoose.model("Doctor",doctorSchema);

module.exports = Doctor;