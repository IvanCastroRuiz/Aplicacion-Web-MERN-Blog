'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Article = require('../models/article');

var controller = {

    datosCurso: ( req, res ) =>{

        return res.status(200).send({
        curso: "Master en FrameWorks JS",
        autor: "Ivan Castro Ruiz",
        url: "https://github.com/IvanCastroRuiz"
        });
    },

    test: (req, res) => {	
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de articulos'
        });
    },

    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;
        console.log(params);
        // validar datos (validator)

        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_title && validate_content){
           
            // Crear el objeto a guardar
            var article = new Article();
            
            //Asignar valores las articles
            article.title = params.title;
            article.content = params.content;
            article.image = null;
            
            // Guardar el articulo
            article.save((err, articleStore) => {

                if (err || !articleStore) {
                    return res.status(404).send({
                        status: 'error',
                        message: "El articulo no se ha guardado !!!"
                    });
                }
                // Devolver una respuesta 
                return res.status(200).send({
                    status: 'success',
                    article: articleStore
                });
            })
        }else{
            return res.status(200).send({
                status: 'error',
                message: "Los datos no son validos"
            });
        }
    },

    getArticles : (req, res) => {

        var query = Article.find({ });
        var last = req.params.last;
        

        if(last || last !== undefined) {
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, articles) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: "Error al devolver los articulos !!!"
                });
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: "No hay articulos para mostar !!!"
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },

    getArticle : (req, res) => {
        
        // recoger el id de la url de
        var articleId = req.params.id;

        // Comprobar que existen 
        if(!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: "No existe el articulo !!!"
            });    
        }
        // Buscar el articulos para most
        Article.findById(articleId, (err, article) => {
            
            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el articulo !!!"
                });
            }
            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                article
            });
        });
    }, 

    update : (req, res) => {

        // Recoger el id del articulo por la URL
        var articleId = req.params.id;
        // Recoger los datos que llegan por PROCUREMENT
        var params = req.body;
        // Validar datos 
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });  
        }

        if(validate_title && validate_content){
            // Find and update 
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdate) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: "Error al actualizar !!!"
                    });
                }

                if(!articleUpdate){
                    return res.status(404).send({
                        status: 'error',
                        message: "No existe el articulo !!!"
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdate
                });

            });
        }else{
            // Devolver respuesta 
            return res.status(200).send({
                status: 'error',
                message: "la validacion no es correcta"
            }); 
        }
    },

    delete: (req, res) => {
        // Recoger el ID de la url para
        var articleId = req.params.id;
        // Find ans delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) =>{
            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error al borrar !!!!"
                });
            }

            if(!articleRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: "No se ha borrado el articulo, posiblemente no exista !!!!"
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        })
    }, 

    upload: (req, res) => {

        // Configurar el modulo connect multiparty router/article.js (hecho)

        // Recoger el fichero de la peticiones
        var file_name = 'Imagen no subida..';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        };
        // Conseguir el nomre y la extencion del archivo para
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        /*ADVERTENCIA * EN LINUX O MAC*/
        //var file_split = file_path.split('/');

        // Nombre del archivo para
        var file_name = file_split[2];
        // Extension de la extencion del archivo
        var extension_split = file_name.split('\.');
        var file_exp = extension_split[1];

        // Comprobar la extencion, solo imagenes, si es valida borrar el fichero de

        if(file_exp != 'png' && file_exp != 'jpg' && file_exp != 'jpeg' && file_exp != 'gif'){
            
            // borrar archivo subido
            fs.unlink(file_path, (err) =>{
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida !!!'
                });
            });

        }else{
            // si todo es valido, sacando id de la url
            var articleId = req.params.id;
            // Buscar el articulo, asignarle el nombre de la imagen y actualizar
            Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true}, (err, articleUpdate) =>{
                
               if(err || !articleUpdate){
                    return res.status(200).send({
                        status: 'error',
                        article: 'Error al guardar la imagen de articulo'
                    });    
                }    
                
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdate
                });
            });
        }        
    }, // end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/'+file

        fs.exists(path_file, (exists) =>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });
    },

    search: (req, res) => {

        // Sacar el strmg a Buscar
        var searchString = req.params.search;

        // Find or
        Article.find({  "$or": [
            { "title": { "$regex": searchString, "$options":"i"}},
            { "content": { "$regex": searchString, "$options":"i"}}        
        ]})
        .sort([['date','descending']])
        .exec((err, articles) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la peticion !!!'
                });
            };

            if(!articles  || articles.length<=0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos que coincidan con tu busqueda !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    }
}; // end controller

module.exports = controller;