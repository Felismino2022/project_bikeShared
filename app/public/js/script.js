//adicionar estação
$('#addForm').submit(function () {
    var nome = $('#nome').val();
    var latitude = $('#latitude').val();
    var longitude = $('#longitude').val();
    var premio = $('#premio').val();
    var capacidade = $('capacidade').val()
    //var cinema_cidade = $('#cinema_cidade').val();

    $.ajax({
        type: 'post',
        url: '/create_estacao',
        dataType: 'JSON',
        data: {
            nome: nome,
            latitude:latitude,
            longitude:longitude,
            capacidade:capacidade,
            premio:premio               
        },
        success: function (response) {
            if (response.done == true) {
                $('.response_return').html('<div class="alert bg-success text-white text-center alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em> Estação inserido com sucesso</div>');
            } else {
                $('#exampleModal').modal('show')
                $('.create_response').html('<div class="alert bg-danger text-white text-center alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + response.return + '</div>');
            }
        }
    });

    return false;
});

//eliminar estação
$(document).on('click', '#delete', function (e) {
    e.preventDefault();

    var estacao_url= $(this).data('id');

    $.ajax({
        type: 'post',
        url: '/delete_estacao',
        dataType: 'JSON',
        data: {
            estacao_url: estacao_url,
        },
        success: function (response) {
            if (response.done == true) {
                $('.response_return').html('<div class="alert bg-danger text-white text-center alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + 'eliminado com sucesso' + '</div>');
            } else {
                $('.response_return').html('<div class="alert bg-danger text-white text-center alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + response.return + '</div>');
            }
        }
    });

});


//vizualizar estação
$(document).on('click', '#visualizar', function (e) {
    e.preventDefault();

    var estacao_url = $(this).data('id');

    $.ajax({
        type: 'post',
        url: '/view_estacao',
        dataType: 'JSON',
        data: {
            estacao_url: estacao_url,
        },

        success: function (response) {
            if (response.done == true) {
                $('#detailsModal').modal('show')
                $('#estacao_nome').val(response.estacoes[0].nome);
                $('#capacidade_estacao').val(response.estacoes[0].capacidade);
                $('#num_premio').val(response.estacoes[0].premio);
            }else{
                $('.response_return').html('<div class="alert bg-danger text-white text-center alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + response.return + '</div>');
                    
                }
            }
        }
    )
    });


//Editar estação
$('#editForm').submit(function () {
    var nome = $('#nome_edit').val();
    var latitude = $('#latitude_edit').val();
    var longitude = $('#longitude_edit').val();
    var premio = $('#premio_edit').val();
    var capacidade = $('#capacidade_edit').val();

    $.ajax({
        type: 'post',
        url: 'update_estacao',
        dataType: 'JSON',
        data: {
            nome: nome,
            latitude: latitude,
            longitude: longitude,
            premio: premio,
            capacidade:capacidade
        },
        success: function (response) {
            if (response.done == true) {
                $('#editarModal').modal('hide');
                $('.response_return').html('<div class="alert bg-success text-white text-center alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>Editado com sucesso</div>');

               // $('.response').html('<script>alert("Editado com sucesso")</script>');
            } else {
                $('.response').html('<div class="alert bg-danger alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + response.return + '</div>');
            }
        }
    });

    return false;
});

//edit

$(document).on('click', '#editarbtn', function (e) {
    e.preventDefault();

    var estacao_url= $(this).data('id');
    
    $.ajax({
        type: 'post',
        url: 'edit_estacao',
        dataType: 'JSON',
        data: {
            estacao_url : estacao_url,
        },
        success: function (response) {
            if (response.done == true) {
                $('#editarModal').modal('show')
                $('#nome_edit').val(response.estacoes[0].nome);
                $('#latitude_edit').val(response.estacoes[0].latitude);
                $('#longitude_edit').val(response.estacoes[0].longitude);
                $('#premio_edit').val(response.estacoes[0].premio);
                $('#capacidade_edit').val(response.estacoes[0].capacidade);
            } else {
                $('.response_return').html('<div class="alert bg-danger text-white text-center alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + response.return + '</div>');
            }
        }
    });

});



//eliminar utilizador
$(document).on('click', '#delete_tilizador', function (e) {
    e.preventDefault();

    var id= $(this).data('id');

    $.ajax({
        type: 'post',
        url: '/delete_utilizador',
        dataType: 'JSON',
        data: {
            id: id,
        },
        success: function (response) {
            if (response.done == true) {
                $('.response_user').html('<div class="alert bg-danger text-white text-center alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + 'eliminado com sucesso' + '</div>');

            } else {
                $('.response_user').html('<div class="alert bg-danger alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + response.return + '</div>');
            }
        }
    });

});

//vizualizar Utilizador
$(document).on('click', '#visualizar_utilizador', function (e) {
    e.preventDefault();

    var id= $(this).data('id');

    $.ajax({
        type: 'post',
        url: '/view_utilizador',
        dataType: 'JSON',
        data: {
            id: id,
        },
        success: function (response) {
            if (response.done == true) {
                $('#detailsUser').modal('show')
                $('#utilizador_nome').val(response.utilizador[0].nome);
                $('#utilizador_email').val(response.utilizador[0].email);
                $('#utilizador_phone').val(response.utilizador[0].phone);
                $('#utilizador_cidade').val(response.utilizador[0].city);
            } else {
                $('.response_user').html('<div class="alert bg-danger alert-dismissable" role="alert"><em class="fa fa-lg fa-warning">&nbsp;</em>' + response.return + '</div>');
            }
        }
    });

});

//active sidebar
$('.menu a').each(function(){
    if(window.location.href.indexOf(this.href) > -1){
        $(this).parent().addClass('active');
    }
})

