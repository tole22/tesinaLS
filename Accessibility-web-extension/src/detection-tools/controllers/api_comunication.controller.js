/**
 * @file Metodos para la comunicacion entre la extension y la API rest.
 * @author Maximiliano Jonathan Toledo.
 */


 /**
  * @description Save a new data
  * @param {Object} path 
  * @param {Object} data 
  */
  function API_POST(path, data) {
    (async () => {
        const rawResponse = await fetch(API_URL+path, {
          method: 'POST',
         // mode: 'same-origin',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const content = await rawResponse.text();
      
        console.log(content);
      })();
}
