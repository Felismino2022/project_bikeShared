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

//Estação
routes.post('/create_estacao', AdminController.create)
routes.post('/delete_estacao', AdminController.deleteEstacao);
routes.post('/view_estacao', AdminController.getEstacao)
routes.get('/estacoes', AdminController.getEstacaos)
routes.post('/edit_estacao', AdminController.edit_estacao)
routes.post('/update_estacao', AdminController.update_estacao)

//utilizador
routes.post('/delete_utilizador', AdminController.deleteUtilizador)
routes.post('/view_utilizador', AdminController.getUtilizador)
routes.get('/utilizadores', AdminController.getUtilizadores)
routes.post('/view_utilizador', AdminController.getUtilizador)


routes.get('/consultarSaldo', AdminController.getSaldo)
routes.post('/activar', AdminController.activarUser)


routes.post('/login', UserController.login)
routes.post('/logout', UserController.logout)

module.exports = routes