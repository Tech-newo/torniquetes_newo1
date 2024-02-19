const express = require('express');
const app = express();

// Configura la aplicación de Express para servir contenido desde la carpeta 'www'
app.use(express.static('www'));

// Obtiene el puerto asignado por Heroku o usa el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor en el puerto correcto
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
