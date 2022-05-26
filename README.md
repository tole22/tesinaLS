# Detección automática de problemas de accesibilidad a partir de eventos de interacción de usuario

## Resumen
Actualmente muchas de las actividades de nuestra vida cotidiana se encuentran integradas en una aplicación web. Toda la información de los hechos que
acontecen en el mundo está a un simple clic, por eso es de suma importancia lograr que una gran parte de la sociedad tenga la posibilidad de acceder al
contenido presente en la web. Aquí es donde la accesibilidad web se convierte en un recurso fundamental para combatir con la famosa brecha digital y permitir
que el contenido web sea accesible a la mayor cantidad de personas posibles. Para brindar accesibilidad en un sitio web, es muy importante integrarla al
proceso de desarrollo. Para facilitar esta integración y a la detección de problemas de accesibilidad, en la [tesina para la carrera de Licenciatura en Sistemas](http://sedici.unlp.edu.ar/handle/10915/125055) se desarrolló una herramienta automática
para la detección y reporte de este tipo de problemas denominada **ABF** (*Accessibility BadSmells Finder*).

## Código de la aplicación
**ABF– Accessibility BadSmells Finder**

[**Extensión Web – Link del repositorio público**](https://github.com/tole22/tesinaLS/tree/master/Accessibility-web-extension)

[**API REST – Link del repositorio público**](https://github.com/tole22/tesinaLS/tree/master/rest-api-events-web-extension-Tesina)

[**APP de reportes – Link del repositorio público**](https://github.com/tole22/tesinaLS/tree/master/reportes-app-Tesina/app-reportes-tesina)

## Como ejecutar la herramienta
En cada uno de los repositorios listados anteriormente se describen los pasos necesarios para poder instalar y ejecutar la herramienta de detección en un ambiente local. Para esto se
definieron los pasos para poder ejecutar localmente todos los componentes de la herramienta.

ABF esta dividida en tres componentes principales: **Extensión Web**, **API REST - Base de Datos**, y la **Aplicación de Reportes**.

Se necesita tener la extensión web, API REST y la Base de datos ejecutándose para lograr almacenar la información de los bad smells detectados por
la extensión web.

Para lograr ver estos datos de una forma legible, se debe ejecutar la aplicación de reportes.


**Para poder ejecutar la herramienta se debe tener pre-instalado:**
* [NODE JS](https://nodejs.org/es/download/): versión > 12.0.0, utilizada para este trabajo: v12.14.0
* [Angular CLI](https://angular.io/guide/setup-local): versión 10.2.1
* [MONGODB](https://www.mongodb.com/try/download/community)
* Web Browser: Mozilla Firefox o Google Chrome.

## Preview
El siguiente screenshoot es una muestra de ejemplo para mostrar como son los reportes finales generados por ABF.

![](/reporte_example.png)

## Contribución
El trabajo desarrollado permite a los desarrolladores y dueños de aplicaciones web, obtener reportes de problemas de accesibilidad web complejos, que no
pueden ser detectados mediante el análisis estático de código. La herramienta resultante es de gran utilidad para mejorar la accesibilidad web, debido a su
facilidad para ser extendida con nuevos algoritmos de búsqueda, y a su adaptabilidad para diferentes escenarios de búsqueda.

Cualquier mejora de código para contibuir en continuar con la ampliacion de la herramienta es totalmente bienvenida.  

## Licencia
[MIT](https://choosealicense.com/licenses/mit/)