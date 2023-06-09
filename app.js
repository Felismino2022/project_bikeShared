const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path')
const routes = require('./routes')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./app/middlwares/auth')(passport)


//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './app/views');

//Body Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//sessão
app.use(session({
    secret: "bikeshared",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

//public
app.use(express.static(path.join(__dirname, "app/public")))
app.use(routes)


var PORT = process.env.PORT || 8081

app.listen(PORT, ()=>{
    console.log('Iniciado o servidor ')

})
