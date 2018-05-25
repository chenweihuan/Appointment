var jwt = require('jsonwebtoken');

// 查询，需要token
exports.checkToken = function(req,res,next){
    var reqToken = req.headers.token;
    jwt.verify(reqToken, 'user_pass_xxx', function (err, decoded) {
        if (err){
            res.json({
                message: 'token已过期!',
                info:'-1'
            });
            return;
        }
        // console.log(decoded.id + '通过token验证');
        exports.id = decoded.id;
        next();
      })
}