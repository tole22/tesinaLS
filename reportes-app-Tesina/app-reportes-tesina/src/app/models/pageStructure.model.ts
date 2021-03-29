interface Element {
    text: String,
    tagName: String,
    outerHTML: String
};

interface Visitado {
    identificador: String,
    contador: number,
    ultimoUpdate: Date
};

export interface PageStructure {
    _id: string,
    baseURI: String,
    elementos_interactivos: [{ name: String, elements: [ Element ]}],
    elementos_visitados: [ Visitado ],
    fechaCreacion: Date
};


 //   CAMBIAR POR EVENT Y ESTRUCUTRA, OSEA NECESITO 2 MODELOS
