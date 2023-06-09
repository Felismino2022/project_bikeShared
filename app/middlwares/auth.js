const localStrategy = require("passport-local").Strategy 

module.exports = function(passport){

    passport.use(new localStrategy({usernameField:'email', passwordField:'senha'}, (email, senha, done) => {
        Usuario.findOne({email:email}).then((usuario) =>{
            if(!usuario){
                return done(null, false, {message:'Está conta não existe'})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem)=>{

                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {senha:'senha incorrecta'})
                }
            })
        })
    }))


    //assim que o usuario logar os dados dele serão salvos numa sessão
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })

}