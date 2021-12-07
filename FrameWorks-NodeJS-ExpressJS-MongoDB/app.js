'use strict'

// cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Ejecutar express (http)
var app = express();

// Cargar Carpeta Public

var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.get('/', function (req, res){
    res.sendFile(path.join(__dirname + './index.html'));
});

// Cargar ficheros rutas las
var article_routes = require('./routes/articles');

// Middleware 
//app.use(express.urlencoded());
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Añadir prefijos a rutas / cargar tutas
app.use('/api',article_routes);


// Exportar modulos (fichero actual)
module.exports = app;