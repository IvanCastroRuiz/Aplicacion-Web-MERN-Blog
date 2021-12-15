'use strict'

var mongoose = require('mongoose');
var app = require('./app');
// Importar variables de entorno locales
require('dotenv').config({ path: 'variables.env' });
var port = process.env.PORT || 3000;
// Leer localhost de variables de entornos y puertos
const host = process.env.HOST || '0.0.0.0' ;


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
        .then(()=> {
            console.log('La conexion a la base de datos se ha realizado bien !!!!!');

            // Crear el servisor y ponerme a escuchar peticiones HTTP
            app.listen(port, host, () => {
                console.log(`Servidor corriendo en http://${host}:${port}`);
            });
        });

