
//////////////////  BODY   ////////////////////////

// me guardo los elementos que pueden dar problemas
// con id y con funciones/handlers
var problematic_elements = [];
bodyElements.forEach(
    function (currentValue, currentIndex, listObj) {
        if (esDeRiesgo(bodyElements[currentIndex])) {
            problematic_elements.push(currentValue);
        }
    });