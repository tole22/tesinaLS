/**
 * @file Este archivo es el controlador principal de la deteccion de
 * elementos flotantes inaccesibles, donde se llaman a los pricipales metodos
 * de deteccion y se mantiene un arreglo de elementos detectados para solo reportar al elemento 1 sola vez
 * por sesion.
 * @author Maximiliano Jonathan Toledo.
 */

// Arreglo que contiene los elementos ya reprtados por el usuario
var elementosReportados = [];

function deteccion_de_elementos_flotantes() {
	console.log('En ejecución: Finder de elementos flotantes inaccesibles');
    // Detecciones estaticas
    onLoadCompleteDetection(elementosReportados); // Deteccion cuando cargan todos los componentes de la pagina
    fiveSecondsDetection(elementosReportados); // Deteccion a los 5 segundos de carga de la pagina

    // Detecciones dinamicas
    floatElementsDynamicDetection(elementosReportados);
}
