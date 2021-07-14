const {classes, modules} = require('../databases/models')

class ClassesControllers{
  static async insertClass(request, response){
    const {name, description, date, time, id_module} = request.body
    
    try{
      const existsClassWithThisName = await classes.findOne({where: {name}})

      if(existsClassWithThisName){  
        return response.status(400).send({msg: 'Aula já existe'})
      } 

      const newClass = await classes.create({
        id_module,
        name,
        description,
        date,
        time
      })

      return response.status(200).send({msg: 'Aula foi criada'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

  static async readClassesOfModule(request, response){
    const {id_module} = request.params
    try{
      const readClasses = await classes.findAll({
        where: {
          id_module
        },
        include:{model: modules}
      })
      return response.status(200).send(readClasses)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  
  static async readClass(request, response){
    const {id} = request.params
    try{
      const readClass =  await classes.findOne({
        where:{
          id
        },
        include:{
          model: modules,
          required: true
        }
      })
      return response.status(200).send(readClass)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})

    }
  }
  
  static async updateClass(request, response){
    const {id} = request.params
    const {id_module, name, description, date, time} = request.body

    try{
      const updateClass = await classes.update({
        id_module,
        name,
        description,
        date,
        time,
      },{where: {id}})

      return response.status(200).send({msg: 'Aula atualizada'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    } 
  }
  
  static async deleteClass(request, response){
    const {id} = request.params

    try{
      const deleteClass = await classes.destroy({where: {id}})
      return response.status(200).send({msg: 'Aula foi deletada'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

}


module.exports = ClassesControllers