interface Element {
    tagName: String,
    outerHTML: String,
    bad_smell_type: String,
    ocurrencias: Number,
    ultimoUpdate: Date
};

export interface ReportedPage {
    _id: string,
    baseURI: String,
    reported_elements: [ Element ],
    fechaCreacion: Date,
    ultimoUpdate: Date
};
