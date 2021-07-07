/**
 * @file Asignacion de Handlers a los elementos de la pagina web.
 * En este script se buscan los elementos que poseen algun Hndlers JS asignado
 * @author Maximiliano Jonathan Toledo.
 */

function busqueda_de_handlersJS() {
    setTimeout(function () {
        console.log('Listado de listeners');
        let eventListenersElements = listAllEventListeners();
        console.log(eventListenersElements);
        let elementsToSend = [];

        eventListenersElements.forEach(currentElem => {
            let children = checkHijos(currentElem.node);
            let accessibility_attribs = checkAccessibleAttributes(currentElem.node);
            elementsToSend.push({
                'tagName': currentElem.node.tagName,
                'id_elem': currentElem.node.id,
                'className': currentElem.node.className,
                'outerHTML': currentElem.node.outerHTML.substr(0,50),
                'href': currentElem.node.getAttribute("href") || '',
                'type': currentElem.type,
                'func': currentElem.func,
                'children': children,
                'accessibility_attrib': accessibility_attribs
            });
        });
        let dataToSave = {
            'baseURI': getBaseURI(),
            'elements': elementsToSend,
            'cant_elements': eventListenersElements.length
        };

        console.log(dataToSave);
        // Envio a la API REST los elementos con handlers asignados
        save_elements_with_handlerJS(dataToSave);
    }, 1000);
}

function listAllEventListeners() {
    const allElements = Array.prototype.slice.call(document.querySelectorAll('div, span, li, a'));
    allElements.push(document); // Elemento document
    allElements.push(window); // Elemento document

    const types = ['onclick']; // solo busco handlers onclick

    let elements = [];

    // Recorro cada uno de los elementos especificados en la busqueda
    for (let i = 0; i < allElements.length; i++) {
        const currentElement = allElements[i];

        // Eventos definidos en los atributos del elemento
        // Ejemplo <div> onclick="cancel()"</div>
        for (let j = 0; j < types.length; j++) {
            if (typeof currentElement[types[j]] === 'function') {
                elements.push({
                    "node": currentElement,
                    "type": types[j],
                    "func": currentElement[types[j]].toString(),
                });
            }
        }

        // Eventos definidos con addEventListener
        if (typeof currentElement._getEventListeners === 'function') {
            let evts = currentElement._getEventListeners();
            if (Object.keys(evts).length > 0) {
                for (let evt of Object.keys(evts)) {
                    for (k = 0; k < evts[evt].length; k++) {
                        elements.push({
                            "node": currentElement,
                            "type": evt,
                            "func": evts[evt][k].listener.toString()
                        });
                    }
                }
            }
        }
    }
    return elements.sort();
}

function checkHijos(padre) {
    let hijosArray = [];

    if (padre.childNodes.length < 1) {
        return hijosArray;
    }

   padre.childNodes.forEach(child => {
       if(child.nodeName !== '#text') {
        let hijo = {
            'tagName': child.tagName ? child.tagName : '',
            'href': child.getAttribute("href") ? child.getAttribute("href") : '',
            'tabindex': child.getAttribute("tabindex") ? child.getAttribute("tabindex") : '',
            'aria_label': child.getAttribute("aria-label") ? child.getAttribute("aria-label") : '',
            'role': child.getAttribute("role") ? child.getAttribute("role") : ''
        };
        hijosArray.push(hijo);
       } else {
           hijosArray.push({
            'tagName': 'text',
            'href': ''
            });
       }
   });
   return hijosArray;
}

function checkAccessibleAttributes(elem) {
    if (elem.attributes.length < 1) {
        return {};
    }
    let atributos = {
        'tabindex': elem.getAttribute("tabindex") ? elem.getAttribute("tabindex") : '',
        'aria_label': elem.getAttribute("aria-label") ? elem.getAttribute("aria-label") : '',
        'role': elem.getAttribute("role") ? elem.getAttribute("role") : ''
    };
 return atributos;
}
