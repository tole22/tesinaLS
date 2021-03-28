/**
 * @file Metodos para la comunicacion entre la extension y los endpoints de 
 *  estrucutras de una pagina web de la API rest de eventos.
 * @author Maximiliano Jonathan Toledo.
 */


 /**
  * @description Save a new page structure
  * @param {Object} structure 
  */
function save_structure(structure) {
    (async () => {
        const rawResponse = await fetch(API_URL+'/structures/saveNewStructure', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(structure)
        });
        const content = await rawResponse.text();
      
        console.log(content);
      })();
}
