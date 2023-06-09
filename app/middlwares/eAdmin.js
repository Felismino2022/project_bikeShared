module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error_msg", "Você precisa ser Admin")
        res.redirect("/")
    }
}