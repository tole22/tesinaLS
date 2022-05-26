# API REST
La API REST de ABF encargada de proveer la comunicación entre la extensión web, la base de datos y la aplicación de reportes.

### Pre-requisitos 📋
Tener instalado
```
node.js
```
version recomendada: 8.17.0 x64

### Instalación 🔧
Para tener en funcionamiento la API REST, primero necesitamos descargar o clonar su código fuente del repositorio.


Una vez descargado, podremos comenzar con la instalación de las dependencias de Node que utiliza esta API. Para esto necesitamos:
1. Abrir una consola de sistema en la carpeta del código fuente de la API.
2. En la consola ejecutar el comando:
    ```
    npm install
   ```
3. Renombrar archivo .env-EXAMPLE a .env
4. Una vez que termine la instalación, podremos ejecutar la API REST con el comando:
    ```
    npm run dev
    ```

Con esto ya estaríamos permitiendo que la extensión web almacene eventos, estructuras, smells y demás información en la base de datos a través
de la API REST.

### MongoDB 📌
Recordar tener MONGODB corriendo en el sistema, la REST API se encargará automaticamente de crear las colleciones para la base de datos de ABF.

### Dotenv ⚙️
Uso esta dependencia para guardar variables de entorno para tener más seguridad.
Las variables en desarrollo estan en el .env, en PROD no existe el .env ya que se obtienen del servidor.
