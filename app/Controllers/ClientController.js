


class ClientController{

   async index(req, res){
    res.render('cliente/home', {layout:'main2'})
   }
}



module.exports = new ClientController()