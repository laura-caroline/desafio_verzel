const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {users} = require('../databases/models')
const { exists } = require('fs')
require('dotenv').config()



class UsersControllers {
  static async insertUser (request, response){
    const {user, password} = request.body
    const hashPassword = await bcrypt.hash(password, 6)

    try{
      const existsUser = await users.findOne({where: {user}})
      if(existsUser) {
        return response.status(401).send({msg: 'Usuário já existe'})
      }
      
      const existsUserAdmin = await users.findOne({
        where:{
          authorization: 'admin'
        }
      })
      if(!existsUserAdmin){
        const userAdmin = await users.create({user, password: hashPassword, authorization: 'admin'})
        return response.status(200).send({msg: 'Usuário foi criado'})
      }
      const userDefault = await users.create({user, password: hashPassword, authorization: 'default'})
      return response.status(200).send({msg: 'Usuário foi criado'})
      
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  static async authenticateUser(request, response){
    const {user, password} = request.body
    
    try{
      const existsUser = await users.findOne({where: {user}})

      if(!existsUser){
        return response.status(401).send({msg: 'Usuário não existe'})
      }

      if(!(await bcrypt.compare(password, existsUser.password))){
        return response.status(401).send({msg: 'Senha invalida'})
      }

      if(existsUser.authorization === 'admin'){
        const token = jwt.sign({id: existsUser.id}, process.env.JWT_KEY_ADMIN)
        return response.status(200).send({token, user: existsUser})
      }
      const token = jwt.sign({id: existsUser.id}, process.env.JWT_KEY_USER_DEFAULT, {expiresIn: 86400})
      return response.status(200).send({token, user: existsUser})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }

  }
}

module.exports = UsersControllers