console.log(formElements);

var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      check_issues(mutation);
    });
  });
// Asigno un observable a cada Formulario en la pagina
// observo cambios en el DOM de cada form  
formElements.forEach(function (form) {
    mutationObserver.observe(form, {
        childList: true,
        subtree: true
      });
});

// busco si el elemento es un mensaje desplegado al usuario y si es accesible
function check_issues(mutationRecord) {
    console.log(mutationRecord);
    //console.log(mutationRecord.target.tagName);
    if(mutationRecord.target) {
        if(isErrorMsgElement(mutationRecord.target)){
            isAccesible(mutationRecord.target);
        }
    }
};

// Chequeo si el elemento puede ser un mensaje de error segun el tipo de elemento HTML
function isErrorMsgElement(target) {
    return (target.localName === 'span' ||
            target.localName === 'p' ||
            target.localName === 'label') && target.textContent !== '';
}

function isAccesible(element) {
    var elements = Array.from(element.attributes);
    let cumple = false;

    // chequeo for en elemento label
    if(element.localName === 'label') {
        elements.forEach(attrib => {
            if(attrib.name === 'for') cumple = true;    
        });
    } else { // chequeo los demas tipos de elementos
        elements.forEach(attrib => {
            if(attrib.name === 'role' || attrib.name.includes('aria')) cumple = true;
        });
    }
    
    if(!cumple) {
        console.log('El mensaje no es accesible: ', element.textContent);
        
        /**
         * Event Object que voy a mandar al server
         * @typedef {Object} Event
         * @property {string} baseURI Url donde fue generado el evento
         * @property {Object} data Datos del evento como text, tagName,...
         * @property {Date} fechaCreacion Fecha de generacion del evento
         */
        var event = {
            'baseURI': getBaseURI(),
            'data': {},
            'type': 'FORM_MESSAGE',
            'fechaCreacion': new Date()
        };
        if (element) {
            event.data = {
                'text': element.textContent,
                'tagName': element.tagName,
                'outerHTML': element.outerHTML
            };
        }
        
        console.log(JSON.stringify(event));
        save_bad_smell_event(event);
        }
}

/* Ejemplo de event
{
    "baseURI": "https://autogestion.apronline.gov.ar/",
    "data": { 
        "text": "El CUIT es invalido!",
        "tagName": "SPAN",
        "outerHTML": "<span for=\"cuit\" class=\"error-formu\">El CUIT es invalido!</span>" 
    },
    "type": "FORM_MESSAGE",
    "fechaCreacion": "2021-03-23T23:36:03.183Z"
}
*/