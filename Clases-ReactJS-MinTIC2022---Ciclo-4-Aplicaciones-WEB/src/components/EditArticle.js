import React, {Component} from 'react';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import ViewImage from './ViewImage';
import { Redirect } from 'react-router-dom';
// Validacion de formularios y alertas
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert2';


// 2 crear metodo para sacar ese objeto del backend
// 3 Repoblar el  formulario con esos datos
// 4 actualizar el objeto haciendole uan peticion al backend

class EditArticle extends Component {
    url = Global.url;

    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();
    state = {
        article:{},
        status: null,
        selectedFile: null
    };


    componentWillMount() {
        // 1 Recoger el id del articilo a editar de la url
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        
    };

    getArticle = (id) => {
        
        axios.get(this.url + 'article/' + id)
            .then(res =>{
                this.setState({
                    article: res.data.article
                });
            });
        console.log(this.state.article);
    }

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
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

    }
    saveArticle = (e) => {
        e.preventDefault();
        //Rellenar los datos  del state con el formulario
        this.changeState();


        if(this.validator.allValid()){
            //Hacer una peticion HTTP por post para guardar el articulos
            axios.put(this.url + "article/" + this.articleId, this.state.article)
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
                                        'Articulo actualizado',
                                        'El articulo ha sido actualizado correctamente',
                                        'success'
                                    );
                                }else{
                                    this.setState({
                                        article: res.data.article,
                                        status: "failed"
                                    });
                                    swal.fire(
                                        'Articulo no fue actualizado',
                                        'El articulo NO ha sido actualizado correctamente',
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
        console.log(this.state.article);
        if(this.state.status === "success"){
            return <Redirect to="/blog" />
        }
        return (
            <div id="center">
                <section id = "content" >
                    <h2 className="subheader">Editar Articlulos</h2>

                    {this.state.article.title &&

                        <form className="mid-form" onSubmit={this.saveArticle} >
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} OnChange={this.changeState} />
                            {/* Revisar documentacion */}
                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_dash_space')}

                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" defaultValue={this.state.article.content} ref={this.contentRef} onChange={this.changeState} ></textarea>

                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_dash_space')}

                        </div>
                        <div className="form-group">

                            <label htmlFor="file0">Imagen</label>
                            
                            <input type="file" name="file0" onChange={this.fileChange} />
                            {/* <div className="image-wrap">
                                {
                                    this.state.article.image !== null ? (
                                        <img src={this.url+"get-image/"+this.state.article.image} alt={this.state.article.title} className="thumb" />
                                    ) : (
                                        <img src="https://www.definicionabc.com/wp-content/uploads/Paisaje-Natural.jpg" alt="paisajes" className="thumb" />
                                    ) 
                                }
                            </div> */}

                            <ViewImage
                                title = {this.state.article.title}
                                image = {this.state.article.image}
                                url = {this.url}
                            />        


                            <div className="clearfix"></div>
                        </div>
                        <br/>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>   
                    }

                    {!this.state.article.title &&
                        <h1 className="sudheader">Cargando.......</h1>
                    }

                    
                </section>
                <Sidebar blog = "false" />
            </div>
        )
    }
}
export default EditArticle;