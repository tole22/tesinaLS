//////////////////  SCRIPT JS FILES  ////////////////////////

async function file_get_contents(uri, callback) {
    let res = await fetch(uri),
        ret = await res.text();
    return callback ? callback(ret) : ret;
}

function obtenerScriptElements(nodeList) {
    let arrayScripts = [];
    nodeList.forEach(
        function (currentValue, currentIndex, listObj) {
            if (currentValue.localName == 'script') {
                arrayScripts.push(currentValue);
            }
        });
    return arrayScripts;
}

// elementos <script>
var scripts_head = obtenerScriptElements(headElements);
var scripts_body = obtenerScriptElements(bodyElements);

var scriptsFiles_head = scripts_head.filter(function (e) {
    return e.src != '';
});
var scriptsFiles_body = scripts_body.filter(function (e) {
    return e.src != '';
});
//todos los scripts files de la pagina
var scritsFiles = scriptsFiles_body.concat(scriptsFiles_head);