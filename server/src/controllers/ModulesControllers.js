const {modules, classes, watch_classes} = require('../databases/models')


class ModulesControllers{
  static async insertModule(request, response){
    const {name, description} = request.body
    
    try{
      const existsModuleWithThisName = await modules.findOne({where:{name}})

      if(existsModuleWithThisName){
        return response.status(400).send({msg: 'Modulo já existe'})
      }

      const newModule = await modules.create({
        name,
        description,
      })

      return response.status(200).send({msg: 'Modulo foi criado'})
    }
    catch(error){
      return response.status(400).send({msg: 'ALgo deu errado, tente novamente mais tarde'})
    }
  }
  static async readModules(request, response){
    try{
      const readModules = await modules.findAll({
        include: {
          model: classes,
        }
      })

      return response.status(200).send(readModules)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

  static async readModule(request, response){
    const {id} = request.params

    try{
      const readModule =  await modules.findOne({where:{id}})
      return response.status(200).send(readModule)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})

    }
  }

  static async updateModule(request, response){
    const {id} = request.params
    const {name, description} = request.body

    try{
      const updateModule = await modules.update({
        name,
        description,
      },{where: {id}})

      return response.status(200).send({msg: 'Modulo foi atualizado'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    } 
  }
  
  static async deleteModule(request, response){
    const {id} = request.params
    console.log(id)
    try{
      const deleteModule = await modules.destroy({where: {id}})
      return response.status(200).send({msg: 'Modulo foi deletado'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

}


module.exports = ModulesControllers