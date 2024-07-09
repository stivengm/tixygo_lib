# Librería NPM para Tixygo

Esta librería está realizada en TSDX, esta se usa para generar un hash con información dinámica y retornar la información que se requiera en las aplicaciones de Tixygo.

# Instalación de librería

```js
npm i tixygo-lib
```

# Uso

## Generar HashMap

```js

// Importación de la librería
import { generateHashToken } from 'tixygo-lib';


function generateHashMap() {

    // Modelo para el envío en request
    var request: GenerateHashTokenModel = {
      eventId: "1234",
      memberId: "1234",
      mode: "picker" // edit | inventory | picker
    }

    // Método expuesto para generar el Hash del VMT.
    generateHashToken(
        request,
        (success) => {
            console.log(success);
        },
        (error) => {
            console.log(error);
        }
    );

}
```