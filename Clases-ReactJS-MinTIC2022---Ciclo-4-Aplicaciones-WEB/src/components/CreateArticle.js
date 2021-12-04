import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar'; 
import { Redirect } from 'react-router-dom';
// Validacion de formularios y alertas
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert2';

class CreateArticle extends Component {
    url = Global.url;    
    titleRef = React.createRef();
    contentRef = React.createRef();
    state = {
        article:{},
        status: null,
        selectedFile: null
    };

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator({
            messages:{
                required: 'Este campo es requerido',
                alpha_num_dash_space: 'Debe ingresar caracteres alfanumericos validos'
            },
        });
    }

    fileChange = (e) => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0] 
        });
        console.log(this.state.selectedFile);
    }

    changeState = () =>{
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }         
        });
        
    }
    saveArticle = (e) => { 
        e.preventDefault();
        //Rellenar los datos  del state con el formulario
        this.changeState();   


        if(this.validator.allValid()){
            //Hacer una peticion HTTP por post para guardar el articulos
            axios.post(this.url + "save", this.state.article)
            .then(res => {
                if(res.data.article){
                    this.setState({
                        article: res.data.article,
                        status: "waiting"
                    });
                    // Subir el Archivo
                    if(this.state.selectedFile !== null){
                        // Sacar el ID del article guardador
                        var articleId = this.state.article._id;
                        // Crear form data y añadir el fichero
                        const formData = new FormData();
                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        )
                        // Peticion ajax
                        axios.post(this.url + 'upload-image/'+ articleId, formData)
                            .then(res =>{
                                if(res.data.article){
                                    this.setState({
                                        article: res.data.article,
                                        status: "success"
                                    });
                                    swal.fire(
                                        'Articulo creado',
                                        'El articulo ha sido creado correctamente',
                                        'success'
                                    );
                                }else{
                                    this.setState({
                                        article: res.data.article,
                                        status: "failed"
                                    });
                                    swal.fire(
                                        'Articulo no fue creado',
                                        'El articulo NO ha sido creado correctamente',
                                        'error'
                                    );
                                }
                            })    
                    }else{
                        this.setState({
                            status: 'success'
                        });

                        swal.fire(
                            'Articulo creado',
                            'El articulo ha sido creado correctamente',
                            'success'
                        );

                    }
                }else{
                    this.setState({
                        status: 'failed'
                    });
                    swal.fire(
                        'Articulo no fue creado',
                        'El articulo NO ha sido creado correctamente',
                        'error'
                    );
                };
            });
        }else{

            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
    };    

    render() {
        
        if(this.state.status === "success"){
            return <Redirect to="/blog" />
        }
        return (
            <div id="center">
                <section id = "content" >
                    <h2 className="subheader">Crear Articlulos</h2>
                    <form className="mid-form" onSubmit={this.saveArticle} >
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} OnChange={this.changeState} />
                            {/* Revisar documentacion */}
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_dash_space')}
                        
                        </div>    
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState} ></textarea>
                            
                            {this.validator.message('content', this.state.article.content, 'required')}
                        
                        </div>    
                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>    
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>    
                </section>    
                <Sidebar blog = "false" />
            </div>
        )    
    }
}
export default CreateArticle;