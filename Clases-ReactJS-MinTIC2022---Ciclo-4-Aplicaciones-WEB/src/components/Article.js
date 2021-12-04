import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
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
                { /* <!-- LIMPIAR FLOTADOS --> */ } 
                <div className = "clearfix" > </div>                     
                <button onClick={
                    () => {
                        this.deleteArticle(article._id)
                    }

                } className="btn btn-warning">Eliminar</button>   
                
                     
		        <NavLink to={"/blog/editar/" + article._id} className="btn  btn-danger">Editar</NavLink>        

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