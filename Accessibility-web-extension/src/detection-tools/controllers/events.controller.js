/**
 * @file Metodos para la comunicacion entre la extension y la Api Rest de eventos.
 * @author Maximiliano Jonathan Toledo.
 */

 /**
  * @description List all Events
  * <p>Obtiene todos los eventos a travez de fech() === GET</p>
  * <p>uso resp.text() si el endpoint no retorna un objeto JSON</p>
  * <p>caso contrario utilizo resp.json() para recibir la respuesta</p>
  */
function list_all_events() {
    fetch(API_URL+'/events')
    .then((resp) => resp.text())
    .then(function(data) { console.log(data)})
}

 /**
  * @description Save a new event
  * @param {Object} event 
  */
function save_event_into_db(event) {
    (async () => {
        const rawResponse = await fetch(API_URL+'/events/save-event', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        });
        const content = await rawResponse.text();
      
        console.log(content);
      })();
}

