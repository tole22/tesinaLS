const fs = require('fs');

class FileManager {

    constructor() {
        this.fs = fs;
    }

    /**
     * @param {string} archivo ruta relativa o absoluta del archivo a escribir
     * @param {string} contenido Contenido del archivo a escribir.
     * @param {function} funcion que maneja el evento al termino del mismo
     */
    write(archivo, contenido, handler) {
        this.fs.appendFile(archivo, contenido, handler);
    }

    /**
     * @param {string} archivo ruta relativa o absoluta del archivo a escribir
     * @param {function} funcion que maneja el evento al termino del mismo
     */
    read(archivo, handler) {
        this.fs.readFile(archivo, 'utf8', handler);
    }
}

module.exports = FileManager;
