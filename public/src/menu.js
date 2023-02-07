import $ from 'jquery';

export function mostrarMenu(){
    $('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
}