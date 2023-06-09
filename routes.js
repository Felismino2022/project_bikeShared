const {Router} = require('express')
const routes = new Router()
const ClientController = require('./app/Controllers/ClientController')
const AdminController = require('./app/Controllers/AdminController')
const UserController = require('./app/Controllers/UserController')

//passar em todas as rotas do administrador ou cliente
const {eAdmin} = require('./app/middlwares/eAdmin')
const {eCliente} = require('./app/middlwares/eCliente')

//ClientController


routes.get('/', ClientController.index)

//AdminController
routes.get('/admin', AdminController.index)
routes.get('/utilizadores', AdminController.getUser)
//routes.get('/teste', ClientController.teste3)

routes.get('/estacao', AdminController.estacao)
//routes.post('/estacao', ClientController.setEstacoes)
routes.get('/consultarSaldo', AdminController.getSaldo)
routes.get('/infoEstacao/:id', AdminController.infoEstacao)
routes.post('/activar', AdminController.activarUser)
routes.post('/entregar/:estacao_id', AdminController.entregarBiscleta)
routes.post('/levantar/:estacao_id', AdminController.levantarBiscicleta)

routes.post('/login', UserController.login)
routes.post('/logout', UserController.logout)

module.exports = routes