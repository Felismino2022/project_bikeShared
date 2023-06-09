module.exports = {
    eCliente: function(req, res, next){
        if(req.isAuthenticated() && req.user.admin == 2){
            return next()
        }
        req.flash("error_msg", "Você precisa ser Admin")
        res.redirect("/")
    }
}