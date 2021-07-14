const jwt = require("jsonwebtoken")
const {promisify} = require('util')

require('dotenv').config()

module.exports = async (request, response, next)=>{
    const authHeader = request.headers.authorization
    
    if(!authHeader){
        return response.status(401).json({error: 'Token not provided'})
    }
    const [, token] = authHeader.split(' ')

    try{
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY_USER_DEFAULT)
        next()
    }
    catch(err){
        response.status(401).json({error: 'Token invalid'})
    }
    
}