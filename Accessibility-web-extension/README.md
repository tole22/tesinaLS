
#### SRC/JS
        - page_elements.js
            contiene los elementos del head y body(BodyElements, HeadElements).  Y una funcion(esDeRiesgo) para determinar si son elementos que pueden presentar problemas.
        - body_elements.js
            guardo en el array problematic_elements, los elemntos del body que pueden tener problemas, utilizo esDeRiesgo() para filtrar.
        - scripts_elements.js
            file_get_contents(uri, callback) - le paso la url del .js file y obtengo el ocntenido.
            obtenerScriptElements(nodeList) - filtra y retorna un array de los elementos <script></script> dentro de node list.
            scriptsFiles_head - variable donde voy a tener los elementos script que tienen un source asi puedo ir a buscar esos files.  
        - content_script.js
            Este es el file base de la web extension.
            Casos de issues de accesibilidad:
                - DIVS con onclicks asociados:
                    has_click_events_onScript(idElement, script) - hago una busqueda en el script(en formato string) que recibo como parametro y hago una busqueda utilizando el ID del elemento que recibo como parametro.
                    element_has_click_events_onScripts(idElement) - busca en todos los archivos .js de la pagina, si el elemento tiene eventos clicks asociados.
                    
