
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = require('./user.js')
var token = require('./../models/token.js')


var relationSchema = new Schema({
    userId:Schema.Types.ObjectId,
    doctorId:Schema.Types.ObjectId,
    orderTime:{ type: Date, default: Date.now },
    status:{type:String,default:0},//状态默认值为0
    comment:[{
        starNum:Number,
        comment:String,
        date:Date
    }]
});


// 用户预约医生
relationSchema.statics.orderDoctor = function(userInfo,callback){
    relation.create({userId:token.id,doctorId:userInfo.doctorId},function(){
        let callbackJson = {
            message: 'order doctor success!',
            info:'1'
        }
        callback(callbackJson);
    })
}
// 用户根据状态查找我的预约
relationSchema.statics.userFindOrder = function(userInfo,callback){
    var id = mongoose.Types.ObjectId(token.id);//把字符串id转化为objectid
    relation.aggregate(
        [{$lookup:
            {
                from: "doctors",
                localField:	"doctorId",
                foreignField: "_id", 
                as: "doctor" 
            }}
            ,{ $match : { userId : id , status:userInfo.status} }
        ],function(err,results){
                let callbackJson = {
                    message: 'find order success!',
                    info:'1',
                    data:results
                }
                callback(callbackJson)
            })
}
// 用户根据状态查找我的预约
relationSchema.statics.findDoctorDetail = function(userInfo,callback){
    var id = mongoose.Types.ObjectId(userInfo.id);//把字符串id转化为objectid
    console.log(userInfo.id)
    relation.aggregate(
        [{$lookup:
            {
                from: "doctors",
                localField:	"doctorId",
                foreignField: "_id", 
                as: "doctor" 
            }}
            ,{ $match : { doctorId : id } }
        ],function(err,results){
                let callbackJson = {
                    message: 'find doctor detail success!',
                    info:'1',
                    data:results
                }
                callback(callbackJson)
            })
}
// 用户预约医生
relationSchema.statics.orderDoctor = function(userInfo,callback){
    relation.create({userId:token.id,doctorId:userInfo.doctorId},function(){
        let callbackJson = {
            message: 'order doctor success!',
            info:'1'
        }
        callback(callbackJson);
    })
}
// 医生根据状态查看我的预约
relationSchema.statics.doctorFindOrder = function(userInfo,callback){
    var id = mongoose.Types.ObjectId(token.id);//把字符串id转化为objectid
    relation.aggregate(
        [{$lookup:
            {
                from: "users",
                localField:	"userId",
                foreignField: "_id", 
                as: "users" 
            }}
            ,{ $match : { doctorId : id , status:userInfo.status} }
        ],function(err,results){
                let callbackJson = {
                    message: 'doctor find order success!',
                    info:'1',
                    data:results
                }
                callback(callbackJson)
            })
}
// 医生接受用户的预约
relationSchema.statics.acceptUser = function(userInfo,callback){ 
    relation.update({"_id":userInfo.id},{"status":"1"},function(err,ca){
        let callbackJson = {
            message: 'accept user success',
            info:'1'
        }
        callback(callbackJson);
    });
}
// 医生拒绝用户的预约
relationSchema.statics.rejectUser = function(userInfo,callback){ 
    relation.update({"_id":userInfo.id},{"status":"2"},function(err,ca){
        let callbackJson = {
            message: 'reject user success',
            info:'1'
        }
        callback(callbackJson);
    });
}
// 用户点击预约完成，进入评价页面
relationSchema.statics.completeOrder = function(userInfo,callback){ 
    relation.update({"_id":userInfo.id},{"status":"3"},function(err,ca){
        let callbackJson = {
            message: 'complete order success',
            info:'1'
        }
        callback(callbackJson);
    });
}
// 用户评价医生
relationSchema.statics.commentDoctor = function(userInfo,callback){ 
    var comment = {starNum:userInfo.starNum,comment:userInfo.comment,date:new Date()}
    console.log(comment)
    relation.update({"_id":userInfo.id},{ $addToSet: {comment:comment}},
        function(err,ca){
            let callbackJson = {
                message: 'add complete success',
                info:'1'
            }
            callback(callbackJson);
        });
}
//model
var relation = mongoose.model("relation",relationSchema);

module.exports = relation;