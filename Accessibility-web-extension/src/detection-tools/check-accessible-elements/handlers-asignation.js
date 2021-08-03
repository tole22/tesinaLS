/**
 * @file Asignacion de Handlers a los elementos de la pagina web.
 * En este script se buscan los elementos que reciben interaccion por parte del usuario
 * @see Documentacion util sobre document.querySelectorAll {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll}.
 * @author Maximiliano Jonathan Toledo.
 */

function setEventListeners() {
	console.log('En ejecución: Finder de elementos interactivos inaccesibles con handlers JS asignados');
	
	links_visibles_en_el_body.forEach(function (link) {
		link.addEventListener('keydown', function (e) { action_on_focus(e, link); });
	});
}
// hay links que no tienen texto, pueden ser una imagen, y en ciertos casos no tienen ni un atributo alt, por ende el screen reader no dice nada


// Funciones en comun
/**
 * Logica cuando hay foco en @elem
 * @param {Object} e Evento, 
 * @param {Object} elem 
 * @description keyCode = 9 para tecla TAB;
 * keyCode = 88 para tecla X, utilizado por NVDA para links
 */
function action_on_focus(e, elem) {
	console.log("Se hizo foco en el elemento llamado: "
		+ elem.innerText // Registrarme - Entrar
		+ ", de tipo: "
		+ elem.localName // a - button
		+ ", "
		+ elem.computedRole // link - button
		+ ", keyCode es= "
		+ e.keyCode
	);

	if (e.keyCode == 9 || e.keyCode == 88) {
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
			'fechaCreacion': new Date()
		};
		if (elem) {
			event.data = {
				'text': elem.text,
				'tagName': elem.tagName,
				'outerHTML': elem.outerHTML
			};
		}

		save_event_into_db(event);
	}
};


/***********************ARMO EL ARREGLO CON LOS ELEMENTOS INTERACTIVOS********************************/

// Links
var links_elems = [];
links_visibles_en_el_body.forEach(link => {
	if(links_elems.length < 100) {
		links_elems.push(createLinkJson(link));
	}
});


/***********************Estructura del DOM con elementos interactivos********************************/

/**
 * Objecto con los elementos interactivos para mandar al server
 * @type {{baseURI: string, elementos_interactivos: Array, fechaCreacion: Date}}
 */
const web_elements = {
	'baseURI': getBaseURI(),
	'elementos_interactivos': [
		{
			name: 'body_links',
			elements: links_elems
		}
	],
	'fechaCreacion': new Date()
};

save_structure(web_elements);

/***********************Objetos JSON********************************/
/**
 * 
 * @param {*} domElem
 * @returns {{text: string, tagName: string, outerHTML:string} | {}}
 */
function createLinkJson(domElem) {
	if (domElem) {
		return {
			'text': domElem.text,
			'tagName': domElem.tagName,
			'outerHTML': domElem.outerHTML
		};
	} else return {};
}


// Logs
// console.log(body_links);
// console.log(body_btns);
// console.log(links_elems);
// console.log(web_elements);
