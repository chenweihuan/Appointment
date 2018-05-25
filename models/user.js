var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var token = require('./../models/token.js')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    phone : Number,
    password : String,
    sex:String,
    age:Number,
    realName:String
});

// 建立索引，以电话号码为索引
userSchema.index({ phone: 1 }); 


// 用户注册
userSchema.statics.addUser = function(userInfo,callback){
    // 先通过电话号码查找用户，如果已存在就返回-1
    User.find({phone:userInfo.phone}, function(err, animals) {
        if(animals.length !== 0){//用户已存在
            let callbackJson = {
                message: 'your phone is exist!',
                info:'-1'
            }
            callback(callbackJson);
        }else{//用户未存在，创建用户
            User.create(userInfo,function (param) { 
                let callbackJson = {
                    message: 'create user success!',
                    info:'1'
                }
                callback(callbackJson);
            })
        }
    });
}
// 用户登录
userSchema.statics.userLogin = function(userInfo,callback){
    // 先通过电话号码查找用户，如果已存在就返回-1
    User.find({phone:userInfo.phone}, function(err, results) {
        if(results.length == 0){//用户未注册
            let callbackJson = {
                message: 'your phone is not exist!',
                info:'-1'
            }
            callback(callbackJson);
        }else{//用已存在，验证密码
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
//修改用户信息
userSchema.statics.changeUserInfo = function(userInfo,callback){ 
    User.update({"_id":token.id},userInfo,function(err,ca){
        let callbackJson = {
            message: 'change success',
            info:'1'
        }
        callback(callbackJson);
    });
}

//model
var User = mongoose.model("User",userSchema);

module.exports = User;