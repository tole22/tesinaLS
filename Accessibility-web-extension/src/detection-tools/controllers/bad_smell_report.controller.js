/**
 * @file Metodos para la comunicacion entre la extension y los endpoints de 
 *  Bad Smells report de una pagina web con la API rest de eventos.
 * @author Maximiliano Jonathan Toledo.
 */


 /**
  * @description Save Bad Smell report
  * @param {Object} event 
  */
  function save_bad_smell_event(event) {
    (async () => {
        const rawResponse = await fetch(API_URL+'/badSmellReport/saveNewBadSmellEvent', {
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