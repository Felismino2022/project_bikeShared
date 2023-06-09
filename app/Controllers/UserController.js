
class UserController{

    async login(req, res, next){
        passport.authenticate("local", {
            successRedirect:"/",
            failureRedirect:"/login",
            failureFlash:true
        })(req, res, next)
    }
  
    async logout(req, res){

        //automaticamente o passport ele vai fazer o logout pra mim
        req.logout()
        req.flash('sucess_msg', 'Deslogado com sucesso!')
        res.redirect('/')
    }
    
 }
 
 
 
 module.exports = new UserController()