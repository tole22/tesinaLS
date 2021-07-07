interface Element {
    text: String,
    tagName: String,
    outerHTML: String
};

interface Child {
    tagName: String,
    href: String,
    tabindex: String,
    aria_label: String,
    role: String
};

interface Atributos {
    tabindex: String,
    aria_label: String,
    role: String
};

export interface ElemWithHandler {
    id_elem: String,
    className: String,
    tagName: String,
    outerHTML: String,
    href: String,
    type: String,
    func: String,
    children: [ Child ],
    accessibility_attrib: Atributos,
    isAccesible: Boolean,
    message: String
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
    elementos_con_handler: [ ElemWithHandler ],
    fechaCreacion: Date
};
