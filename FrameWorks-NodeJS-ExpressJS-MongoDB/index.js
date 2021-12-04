'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3900;

// 'mongodb://localhost:27017/api_rest_blog'

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://icastror:root@apiretblog.8yuyt.mongodb.net/api_rest_blog?retryWrites=true&w=majority', {useNewUrlParser: true})
        .then(()=> {
            console.log('La conexion a la base de datos se ha realizado bien !!!!!');

            // Crear el servisor y ponerme a escuchar peticiones HTTP

            app.listen(port, () => {
                console.log(`Servidor corriendo en http://localhost: ${port}`);
            });
        });

