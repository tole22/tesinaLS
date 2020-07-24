
console.log(bodyElements);

////////////////////////// CASOS DIVS /////////////////////////////////////////

var divsProblematicos = problematic_elements.filter(function (elem) {
    return elem.localName == 'div';
});

var divs_con_atributo_onclick = divsProblematicos.filter(function (elem) {
    return elem.hasAttribute('onclick');
});

var divs_con_id_sin_atributo_onclick = divsProblematicos.filter(function (elem) {
    return !elem.hasAttribute('onclick');
});
// busco si el elemento tiene eventos click asociados en el script
function has_click_events_onScript(idElement, script) {
    return script.includes("getElementById('" + idElement + "').onclick") ||
        script.includes(`getElementById("` + idElement + `").addEventListener("click"`);
    //chequear los demas casos con "" o ''
};

//busco si el div tiene eventos onclick en todos los js files
 function element_has_click_events_onScripts(idElement) {
    async function check_click_Events(id) {
      let cumple = false;
        for (let file of scritsFiles) {
            await file_get_contents(file.src).then(content => {
                if (has_click_events_onScript(id, content)) {
                    cumple = true;
                }
            });
        };
      return cumple;
    };
  return check_click_Events(idElement);
}

// Busco en los JS usando los IDs los divs que tienen un handler click asignado
divs_con_id_sin_atributo_onclick.forEach(
    function (currentValue) {
        console.log(currentValue.id);
        element_has_click_events_onScripts(currentValue.id).then(result => { console.log(result); });
});


////////////////////////////////////////////////////////////////////////////
////////////////////////////////LOGGING/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// Divs con atributo onclick
console.log(divs_con_atributo_onclick); 