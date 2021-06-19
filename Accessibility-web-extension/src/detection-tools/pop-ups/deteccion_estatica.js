
//////////////////BUSQUEDAS//////////////////////

// realizo la primera busqueda cuando termina de cargar completamente la pagina
function onLoadCompleteDetection(reportedElements) {
  window.addEventListener('load', (event) => {
    const elemsInicio = obtenerElemAlInicio();
    const elemsInicioFinal = eliminarElementosOcultos(elemsInicio);
    elemsInicioFinal.forEach(elem => isFloatDivAccesible(elem, reportedElements));
  });
}


// realizo una segunda busqueda a los 5 segundos
function fiveSecondsDetection(reportedElements) {
  setTimeout(function () {
    const elems5Seg = obtenerElemAlInicio();
    const elems5SegFinal = eliminarElementosOcultos(elems5Seg);
    elems5SegFinal.forEach(elem => isFloatDivAccesible(elem, reportedElements));
  }, 5000);
}

//////////////////FUNCIONES//////////////////////

function eliminarElementosOcultos(elementosOcultos) {
  return elementosOcultos.filter(elem => {
    // Attributos de ocultamiento
    let display = window.getComputedStyle(elem).getPropertyValue('display');
    let visibility = window.getComputedStyle(elem).getPropertyValue('visibility');
    return visibility !== 'hidden' && display !== 'none';
  });
}

function obtenerElemAlInicio() {
  let divs = getBodyDiv();
  return [...divs].filter(
    elem => {
      let zIndex = window.getComputedStyle(elem).getPropertyValue('z-index');
      let position = window.getComputedStyle(elem).getPropertyValue('position');
      // Posiciones en pantalla
      let bottom = window.getComputedStyle(elem).getPropertyValue('bottom');
      let top = window.getComputedStyle(elem).getPropertyValue('top');
      let left = window.getComputedStyle(elem).getPropertyValue('left');
      let right = window.getComputedStyle(elem).getPropertyValue('right');
      // Attributos de ocultamiento
      let display = window.getComputedStyle(elem).getPropertyValue('display');
      let visibility = window.getComputedStyle(elem).getPropertyValue('visibility');

      return esElementoFlotante(zIndex, position);
    });
}


function isFloatDivAccesible(element, reportedElements) {
  let attirbElements = Array.from(element.attributes);
  let cumple = false;

  if (element.id || element.class) {
    // si el elemento ya fue reportado, no lo reporto. Si no fue reprotado aun agrego su id o class
    if (reportedElements.indexOf(element.id) >= 0 || reportedElements.indexOf(element.class) >= 0) return
    if (element.id) {
      reportedElements.push(element.id);
    } else if (element.class){
      reportedElements.push(element.class);  
    }
  }
  attirbElements.forEach(attrib => {
    if (attrib.name === 'role' || attrib.name.includes('aria')) cumple = true;
  });

  if (!cumple) {
    console.log(`El elemento flotante no es accesible, id: ${element.id}, class:  ${element.class}, content: ${element.textContent.trim()}`);

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

