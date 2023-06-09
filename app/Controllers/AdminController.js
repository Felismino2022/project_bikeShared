class AdminController{
  
    async index(req, res){
        res.render('admin/index', {layout: 'main'})
    }

    async getUser(req, res){
        res.render('admin/usuarios', {layout:'main'})
    }

    async estacao(req, res){
       // console.log(req.body.latitute)
       /* const vetores = [];
        const nomes = {nome:'filo', idade:12}
        const nomess = {nome:'sadi', idade:14}
        vetores.push(nomes)
        vetores.push(nomess)
       // req.flash("success_msg", "nome inserido com sucesso")
      //  res.redirect('/')*/
      const soap = require('soap')
      const url = 'http://localhost:8080/webservice?WSDL'

      soap.createClient(url, (err, client)=>{
      //console.log(client.listarEstacoes)
        
        if(err){
            //res.flash('error_msg', 'houve um erro')
            console.log('falha')
        }else{
            client.listarEstacoes({
                k:2,
                latitude:10,
                longitude:10
            }, (err, respost) =>{
               // if(res){
                    res.render('admin/estacao', {layout:'main', respost:respost})
                    //console.log(res)
             //   }else{
              //      res.flash('error_msg', 'houve um erro') 
              //  }
            })
        }
    })

      //res.render('estacao', {leyout: 'main'})
    }

    async setEstacoes(req, res){

        const url = 'http://192.168.137.18:8080/webservice?WSDL'
        
        soap.createClient(url, (err, client)=>{
        
            if(err){
                res.flash('error_msg', 'houve um erro')
            }else{
                client.listarEstacoes({
                    k:req.body.num,
                    latitude:req.body.latitute,
                    longitude:req.body.longuitude
                }, (err, estacoes) =>{
                    if(estacoes){
                        res.render('admin/estacao', {estacoes:estacoes})
                    }else{
                        res.flash('error_msg', 'houve um erro') 
                    }
                })
            }
        })
        }

        async getSaldo(req, res){
        
            soap.createClient(url, (err, client)=>{
            
            if(err){
                console.log('erro')
            }else{
                client.consultarSaldo({
                    email:req.body.email
                }, (err, res) =>{
                    console.log(res)
                })
            }
        })
        }

        async activarUser(req, res){

            soap.createClient(url, (err, client)=>{
            
                if(err){
                    console.log('erro')
                }else{
                    client.activarUtilizador({
                        email: req.body.email,
                        passe:req.body.pass
                    }, (err, res) =>{
                        req.flash("success_msg", "Utilizador activado com sucesso")
                        res.redirect("/users")
                    })
                }
            })
        }

        async entregarBiscleta(req, res){

            soap.createClient(url, (err, client)=>{
            
                if(err){
                    console.log('erro')
                }else{
                    client.entregarBiscleta({
                        email: req.body.email,
                        estacaoid: req.params.estacao_id
                    }, (err, res) =>{
                        req.flash("success_msg", "Biscicleta entregada com sucesso")
                        res.redirect("/")
                    })
                }
            })
        }

        async infoEstacao(req, res){

            soap.createClient(url, (err, client)=>{
            
                if(err){
                    console.log('erro')
                }else{
                    client.obterInfoEstacao({
                        id_estacao:req.params.id
                    }, (err, res) =>{
                        console.log(res)
                    })
                }
            })
        }

        async levantarBiscicleta(req, res){
            
            soap.createClient(url, (err, client)=>{
            
                if(err){
                    console.log('erro')
                }else{
                    client.levantarBiscicleta({
                        email: req.body.email,
                        estacaoid: req.params.estacao_id
                    }, (err, res) =>{
                        req.flash("success_msg", "Biscicleta Levantada com sucesso")
                        res.redirect("/")
                       // console.log(res)
                    })
                }
            })
        }
}

module.exports = new AdminController()