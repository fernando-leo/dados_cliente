var beneficiarioArray = [];

$(document).ready(function () {

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        if (!validaCPF($(this).find("#CPF").val()))
            return false;

        $.ajax({
            url: urlSalvarBeneficiariosPost,
            method: "POST",
            data: {
                "beneficiarioArray": beneficiarioArray
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                }
        });




        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
            }
        });
    })
    
})

if (document.getElementById("gridBeneficiarios"))
    $('#gridBeneficiarios').jtable({
        title: 'Beneficiarios',
        paging: true, //Enable paging
        pageSize: 5, //Set page size (default: 10)
        sorting: true, //Enable sorting
        defaultSorting: 'Nome ASC', //Set default sorting
        actions: {
            listAction: urlBeneficiarioList,
        },
        fields: {
            Nome: {
                title: 'Nome',
                width: '50%'
            },
            CPF: {
                title: 'CPF',
                width: '35%'
            }
        }
    });

if (document.getElementById("gridBeneficiarios"))
    $('#gridBeneficiarios').jtable('load');


function inserir() {
    if (!validaCPF($("#CPFBeneficiario").val()))
        return false;

    beneficiarioArray.push({
        "Nome": $("#NomeBeneficiario").val(),
        "CPF": $("#CPFBeneficiario").val()
    });

    $("#NomeBeneficiario").val("");
    $("#NomeBeneficiario").text("");
    $("#CPFBeneficiario").val("");
    $("#CPFBeneficiario").text("");

}

function validaCPF(cpf) {
    cpf = cpf.replace('.', '');
    cpf = cpf.replace('.', '');
    cpf = cpf.replace('-', '');

    if (cpf.length < 11) {
        ModalDialog("Ocorreu um erro", "Sao necessarios 11 digitos para verificacao do CPF! \n\n");
        return false;
	}
    var nonNumbers = /\D/;
    if (nonNumbers.test(cpf)) {
        ModalDialog("Ocorreu um erro", "A verificacao de CPF suporta apenas numeros! \n\n");
        return false;
	}
    if (cpf == "00000000000" || cpf == "11111111111" ||
        cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
        cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
        cpf == "88888888888" || cpf == "99999999999") {
        ModalDialog("Ocorreu um erro", "Numero de CPF invalido!");
        return false;
    }
    var a = [];
    var b = new Number;
    var c = 11;
    for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
    b = 0;
    c = 11;
    for (y = 0; y < 10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }
    status = a[9] + "" + a[10]
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10])) {
        ModalDialog("Ocorreu um erro", "Digito verificador com problema!");
        return false;
    }
    return true;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
