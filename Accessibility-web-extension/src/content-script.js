/**
 * @file Este archivo es el principal de la web extension, aqui es donde se llaman a las funciones
 * principales de cada finder para activarlos y asi comienzan a ejecutarse
 * @author Maximiliano Jonathan Toledo.
 */


// Arranco la herramienta para detectar los elementos web interactivos que pueden ser accesibles
// Finder #1
setEventListeners();
busqueda_de_handlersJS();

// Arranco la herramienta para detectar los mensajes de error inaccesibles en formularios
// Finder #2
//startFormMessagesTool();

// Arranco la herramienta para detectar los elementos flotantes inaccesibles
// Finder #3
//deteccion_de_elementos_flotantes();