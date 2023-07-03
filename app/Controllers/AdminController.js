var soap = require('soap')
var url = 'http://localhost:8080/webservice?WSDL'

class AdminController{
  
    async index(req, res){
        res.render('admin/index', {layout: 'main'})
    }

    async edit_estacao(req, res){
        console.log('editar estação')
    }

    async update_estacao(req, res){
        console.log(req.body.edit_nome)
    }

    async create(req, res){
        console.log(req.body)
    }

    async deleteEstacao(req, res){
        
      soap.createClient(url, (err, client)=>{
      
          if(err){
        //      res.flash('error_msg', 'houve um erro')
          //  console.log(err)
          }else{
              client.deletarEstacao({
                 url_estacao:req.body.estacao_url
              }, (err, estacao) =>{
                 
                res.json(estacao)
              })
          }
      })
    }

    async getEstacaos(req, res){

        soap.createClient(url, (err, client)=>{
            if(err){
          //      res.flash('error_msg', 'houve um erro')
            //  console.log(err)
            }else{
                client.listarEstacoes({
                    k:'1',
                    latitude:'21',
                    longitude:'22'
                }, (err, estacoes) =>{
  
                  if(estacoes.return == 'Ocorreu Um Erro'){
                      estacoes = [];
                   }
                      var estacoes = JSON.parse(estacoes.return)
                      //console.log(estacoes[0].capacidade)
                      res.render('admin/estacoes', {layout:'main', estacoes:estacoes})
                })
            }
        })
  
      }

    async getEstacao(req, res){

       soap.createClient(url, (err, client)=>{
    
             if(err){
                 console.log('erro')
             }else{
                 client.obterInfoEstacao({
                     url_estacao:req.body.estacao_url
                 }, (err, estacao) =>{
            
                     if(estacao.return == 'Ocorreu Um Erro'){
                        res.json(estacao)
                     }else{
                        var estacoes = JSON.parse(estacoes.return)
                        res.json(estacao)
                     }
                     
                 })
             }
         })
    }

    async getUtilizadores(req, res){
        res.render('admin/usuarios', {layout:'main'})
    }

   async deleteUtilizador(req, res){
    console.log(req.body.id)
   }

   async getUtilizador(req, res){
        
    soap.createClient(url, (err, client)=>{
    
        if(err){
      //      res.flash('error_msg', 'houve um erro')
          console.log(err)
        }else{
        //  console.log(client)
        client.obterInfoEstacao({
            id:req.body.id
        }, (err, utilizador) =>{

            if(utilizador.return == 'Ocorreu Um Erro'){
                res.json(utilizador)
             }else{
                var utilizador = JSON.parse(utilizador.return)
                res.json(utilizador)
             }
                res.json(utilizador)
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
}

  // console.log(req.body.latitute)
       /* const vetores = [];
        const nomes = {nome:'filo', idade:12}
        const nomess = {nome:'sadi', idade:14}
        vetores.push(nomes)
        vetores.push(nomess)
       // req.flash("success_msg", "nome inserido com sucesso")
      //  res.redirect('/')*/

module.exports = new AdminController()