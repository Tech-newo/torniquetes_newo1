const express = require('express');
const app = express();

// Configura la aplicación de Express para servir contenido desde la carpeta 'www'
app.use(express.static('www'));

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
