//elementos que contiene el body de .html
var bodyElements = document.querySelectorAll('body *');
//elementos que contiene el head de .html
var headElements = document.querySelectorAll('head *');
//formularios
var formElements = document.querySelectorAll('form');


var array_de_casos = ['id', 'onclick', 'onchange'];

function esDeRiesgo(element) {
    let cumple = false;
    array_de_casos.forEach(
        function (currentValue) {
            if (element.hasAttribute(currentValue)) {
                cumple = true;
            }
        });
    return cumple;
}