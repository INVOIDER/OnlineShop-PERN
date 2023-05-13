const jwt = require('jsonwebtoken')
function checkRole(role){
return function(req,res,next){
    if(req.method ==="OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: "Вы не авторизованы"})
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        if(decoded.role !==role){
            return res.status(403).json({message: "Недостаточно прав"})
        }
        req.user = decoded
        next()
    }
    catch (e){
        return res.status(401).json({message: "Вы не авторизованы"})
    }
}
}
module.exports = checkRole