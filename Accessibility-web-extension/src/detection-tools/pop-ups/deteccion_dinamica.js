
// Funcion principal
function floatElementsDynamicDetection(reportedElements) {
    window.addEventListener('load', (event) => {
        const hiddenFloatElements = obtenerElementosOcultos();
        setFloatElementsObservables(reportedElements, hiddenFloatElements);
    });
}

// Busco los elementos DIV y NAV "flotantes" que estan ocultos
function obtenerElementosOcultos() {
    let divs = getElementosFLotantes();
    return [...divs].filter(elem => {
        // Atributos de ocultamiento
        let display = window.getComputedStyle(elem).getPropertyValue('display');
        let visibility = window.getComputedStyle(elem).getPropertyValue('visibility');
        // Atributos de elementos flotantes
        let zIndex = window.getComputedStyle(elem).getPropertyValue('z-index');
        let position = window.getComputedStyle(elem).getPropertyValue('position');
        let visibilidad = visibility === 'hidden' || display === 'none';
        return visibilidad && esElementoFlotante(zIndex, position);
    });
}

function setFloatElementsObservables(arrayElements, elements) {
    let mutObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes') {
                check_div_element(arrayElements, mutation); 
            }
        });
    });
    // observo cambios en el DOM de cada elemento flotante oculto 
    elements.forEach(function (floatElement) {
        mutObserver.observe(floatElement, {
            attributes: true,
            attributeFilter: ['style'],
            childList: true,
            subtree: true
        });
    });  
}

function check_div_element(arrayElements, mutationRecord) {
    if (mutationRecord.target) {
        // Atributos de ocultamiento
        let displayFloatElem = window.getComputedStyle(mutationRecord.target).getPropertyValue('display');
        let visibilityFloatElem = window.getComputedStyle(mutationRecord.target).getPropertyValue('visibility');
        if (displayFloatElem !== 'none' && visibilityFloatElem !== 'hidden') {
            if (mutationRecord.target.id || mutationRecord.target.class) {
                // si el elemento ya fue reportado, no lo reporto. Si no fue reprotado aun agrego su id o class
                if (arrayElements.indexOf(mutationRecord.target.id) >= 0 || arrayElements.indexOf(mutationRecord.target.class) >= 0) return;
                if (mutationRecord.target.id) {
                    arrayElements.push(mutationRecord.target.id);
                    isDynamicElementAccesible(mutationRecord.target);
                } else if (mutationRecord.target.class){
                    arrayElements.push(mutationRecord.target.class); 
                    isDynamicElementAccesible(mutationRecord.target); 
                }
              }
              
        }  
        
    }
}

function isDynamicElementAccesible(element) {
    let attirbElements = Array.from(element.attributes);
    let cumple = false;
  
    attirbElements.forEach(attrib => {
      if (attrib.name === 'role' || attrib.name.includes('aria')) cumple = true;
    });
  
    if (!cumple) {
      console.log('El elemento flotante dinamico no es accesible: ', element.id);
  
      /**
       * Event Object que voy a mandar al server
       * @typedef {Object} Event
       * @property {string} baseURI Url donde fue generado el evento
       * @property {Object} data Datos del evento como text, tagName,...
       * @property {Date} fechaCreacion Fecha de generacion del evento
       */
      let event = {
        'baseURI': getBaseURI(),
        'data': {},
        'type': 'FLOAT_ELEMENT',
        'fechaCreacion': new Date()
      };
      if (element) {
        event.data = {
          'text': element.textContent.slice(0, 50),
          'tagName': element.tagName,
          'outerHTML': element.outerHTML.slice(0, 100)
        };
      }
      API_POST(SAVE_NEW_BS_EVENT_URL, event);
    }
  }
