const express = require('express')
const route = express.Router()

const UsersControllers = require('./controllers/UsersControllers')
const ModulesControllers = require('./controllers/ModulesControllers')
const ClassesControllers = require('./controllers/ClassesControllers')
const WatchClassesControllers = require('./controllers/WatchClassesControllers')
const authAdminMiddleware = require('./middlewares/auth_admin')
const authUserDefaultMiddleware = require('./middlewares/auth_default')


// Route of user
route.post('/users', UsersControllers.insertUser)
route.post('/users/auth', UsersControllers.authenticateUser)


// Routes of modules

route.get('/modules', ModulesControllers.readModules)

route.post('/modules', authAdminMiddleware, ModulesControllers.insertModule)
route.get('/modules/:id', authAdminMiddleware, ModulesControllers.readModule)
route.put('/modules/:id', authAdminMiddleware, ModulesControllers.updateModule)
route.delete('/modules/:id', authAdminMiddleware, ModulesControllers.deleteModule)


// Routes of classes
route.get('/classes/modules/:id_module', ClassesControllers.readClassesOfModule)
route.get('/classes/:id',authAdminMiddleware ,ClassesControllers.readClass) 
route.post('/classes', authAdminMiddleware, ClassesControllers.insertClass)
route.put('/classes/:id', authAdminMiddleware, ClassesControllers.updateClass)
route.delete('/classes/:id',authAdminMiddleware, ClassesControllers.deleteClass)

// Watch classes
route.post('/watch_classes/user/:id_user/:id_class', authUserDefaultMiddleware, WatchClassesControllers.markClassAsWatched)
route.delete('/watch_classes/user/:id_user/:id_class', authUserDefaultMiddleware, WatchClassesControllers.markoffClassAsWatched)
route.get('/watch_classes/user/:id_user', authUserDefaultMiddleware, WatchClassesControllers.readClassWatchedByUser)

// watched or not by user

route.get('/user/classes/module/:id_user/:id_module', authUserDefaultMiddleware, WatchClassesControllers.readClassWatchedOrNotByUser)
route.get('/user/modules/:id_user', authUserDefaultMiddleware, WatchClassesControllers.readModulesWithClassesWatchedOrNot)
module.exports = route