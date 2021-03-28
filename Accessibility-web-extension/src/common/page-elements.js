/**
 * @file Variables Globales comunes y accesibles en cualquier script
 * Destinadas al acceso a diferentes elementos de la pagina web
 * @author Maximiliano Jonathan Toledo.
 */

/***********************HEAD********************************/
/** 
 * Array con los elementos que contiene el head de .html
 * @type {NodeListOf<any>} 
*/
var headElements = document.querySelectorAll('head *');


/***********************GENERALES********************************/
/** 
 * Array con los formularios del sitio web
 * @type {NodeListOf<any>} 
*/
var formElements = document.querySelectorAll('form');


/***********************BODY********************************/
/** 
 * Array con los elementos que contiene el body de .html
 * @type {NodeListOf<any>} 
*/
var bodyElements = document.querySelectorAll('body *');

/** 
 * Array con botones del body
 * @type {NodeListOf<any>} 
*/
const body_btns = document.querySelectorAll('body button');

/** 
 * Array de los Links <a> del body
 * @type {NodeListOf<any>} 
*/
const body_links = document.querySelectorAll('body a');

/** 
 * Array de los Divs <div> del body
 * @type {NodeListOf<any>} 
*/
var div_body = document.querySelectorAll('body div');


/***********************Funciones********************************/
function getBaseURI() {
	return document.baseURI;
}