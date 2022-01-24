import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import Moment from 'react-moment';
import "moment/locale/es";
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import swal from 'sweetalert2';


//Defenimos una clase
class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentDidMount() {
        this.getArticle();
    };

    getArticle = () => {
        var id = this.props.match.params.id;
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: "success"
                });
            }).catch (err => {
                this.setState({
                    article: false,
                    status: "success"
                });
            })
    };

    deleteArticle = (id) => {

        swal.fire({
            title: 'Estas seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(this.url + 'article/' + id)
                    .then(res => {
                        this.setState({
                            article: res.data.article,
                            status: "delete"
                        });
                        swal.fire(
                            'Articulo eliminado',
                            'El articulo ha sido eliminado correctamente',
                            'success'
                        );
                    })
            }else{
                this.status = 'error';
                swal.fire(
                'Articulo no eliminado!!',
                'El articulo no fue elimado',
                'error'
                );
            };
        }); 
    };

    editArticle = (id) => {
        this.props.history.push("/blog/editar/" + id);
    };

    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        
        if(this.state.status === "delete"){
            return <Redirect to="/blog" />
        }
        
        var article = this.state.article

        return ( 
        <div className = "center" >
            <section id = "content" > {
                this.state.article &&
                <article className = "article-item article-detail" >
                <div className = "image-wrap" > {
                    article.image !== null ? ( <
                        img src = { this.url + "get-image/" + article.image }
                        alt = { article.title }
                        />
                    ) : ( <
                        img src = "https://www.definicionabc.com/wp-content/uploads/Paisaje-Natural.jpg"
                        alt = "paisajes" / >
                    )
                } 
                </div> 
                <h1 className = "subheader" > { article.title } </h1> 
                <span className = "date" >
                <Moment locale="es" fromNow>{article.date}</Moment> 
                </span> 
                <p>
                {article.content}    
                </p> 
                <div id="content">
                    <button onClick={
                        () => {
                            this.editArticle(article._id)
                        }
                        } className="btn btn-danger">Editar</button>
                    <button onClick={
                        () => {
                            this.deleteArticle(article._id)
                        }
                   } className="btn btn-warning">Eliminar</button>   
                </div>
                { /* <!-- LIMPIAR FLOTADOS --> */ } 
                <div className = "clearfix" > </div> 
                </article>
            }

           {!this.state.article  && this.state.status === 'success'  &&
                <div id="article">
                    <h2 className="subheader">El articulo no existe</h2>
                    <p>Intentalo mas tarde</p>
                </div>
            }

            {this.state.status == null &&

                <div id="article">
                    <h2 className="subheader">Cargando.......</h2>
                    <p>Espere unos segundos</p>
                </div>
            }

            </section> 
            <Sidebar blog = "false" />
            </div>
        )
    }
}
export default Article;