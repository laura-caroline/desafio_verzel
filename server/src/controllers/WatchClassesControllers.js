const {watch_classes, classes, modules}= require('../databases/models')

class WatchClassesControllers {
  static async markClassAsWatched(request, response){
    const {id_user, id_class} = request.params
    try{
      const classWatched = await watch_classes.create({
        id_user,
        id_class,
        watched: true
      })

      return response.status(200).send({msg: 'Aula marcada como concluida'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  static async markoffClassAsWatched(request, response){
    const {id_user, id_class} = request.params
      
    try{
      const markoffClass = await watch_classes.destroy({where: {
        id_user,
        id_class
      }})

      return response.status(200).send({msg: 'Aula desmarcada como concluida'})
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  static async readClassWatchedByUser(request, response){
    const {id_user} = request.params
    try{
        const classesWatched =  await classes.findAll({
          include:[
            {
              model: watch_classes,
              where: {
                id_user
              }
            },
            {
              model: modules
            }
          ]
        })
        return response.status(200).send(classesWatched)      
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }

  // Return all modules with classes watched or not by user
  static async readModulesWithClassesWatchedOrNot(request, response){
    const {id_user} = request.params
    console.log(id_user)
    try{
      const readModulesWithClassesWatchedByUser = await modules.findAll({
        include: {
          model: classes,
          include:{
            required:false,
            model: watch_classes,
            where:{
              id_user
            }
          }
      }})
      return response.status(200).send(readModulesWithClassesWatchedByUser)
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'}) 
    }
  }
  // Return all classes of a module watched or not by user
  static async readClassWatchedOrNotByUser(request, response){
    const {id_module, id_user} = request.params
    try{
        const classesWatched =  await classes.findAll({
          where:{id_module},
          include:{
            required: false,
            model: watch_classes,
            where: {
              id_user: request.params.id_user
            }
          },
        })
        return response.status(200).send(classesWatched)      
    }
    catch(error){
      return response.status(400).send({msg: 'Algo deu errado, tente novamente mais tarde'})
    }
  }
  
}

module.exports = WatchClassesControllers