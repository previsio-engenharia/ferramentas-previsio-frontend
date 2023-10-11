import $ from 'jquery';

export function mostrarCnpj(){
    $('.formCNPJ').show();
     $('.formCNAE').hide();
}

export function mostrarCnae(){
    $('.formCNAE').show();
    $('.formCNPJ').hide();
}

