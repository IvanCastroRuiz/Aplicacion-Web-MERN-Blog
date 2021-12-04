import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import "moment/locale/es";
import axios from 'axios';
import Global from '../Global';
//Defenimos una clase
class Articles extends Component {
    url = Global.url;
    state = {
        articles: [],	
        status: null
    };
    //Se  ejecuta antes de renderizar
    //https://es.reactjs.org/docs/react-component.html   (ciclo de vida de componentes)
    componentWillMount(){   
        var home = this.props.home;
        var search = this.props.search; 
        if(home === "true"){
            this.getArticles();
        }else if(search && search !==null && search !== undefined){
            this.getArticlesBySearch(search);
        }else{
            this.getLastArticles();
        };
    };
    // Funcion para la busqueda de articulos
    getArticlesBySearch = (searched) => {
        console.log("getArticles");
        axios.get(this.url+"/search/"+searched)
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: "success"
                });
            })
            .catch(err => {
                this.setState({
                    articles:[],
                    status: "success"
                });
            });
    }
    // Funcion para consultar los ultimos 5 articulos
    getLastArticles = () => {
        console.log("getArticles");
        axios.get(this.url+"articles")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: "success"
                });
                
            });
    }
    // Funcion para consultar todos los articulos
    getArticles = () => {
        console.log("getArticles");
        axios.get(this.url+"articles/last")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: "success"
                });
                
            });
    }
    
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        if(this.state.articles.length >= 1) {
            var lisArticles = this.state.articles.map((article) => {
                return (
                    (
                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={this.url+"get-image/"+article.image} alt={article.title} />
                                ) : (
                                    <img src="https://www.definicionabc.com/wp-content/uploads/Paisaje-Natural.jpg" alt="paisajes" />
                                ) 
                            }
                        </div>
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <NavLink to={'/blog/articulo/'+article._id}>Leer mas</NavLink>
                        {/* LIMPIAR FLOTADOS */}
                        <div className="clearfix">
                        </div>
                    </article>
                    ) 
                );
            })
                return (
                    <div id="articles">
                        <h1>Listado de articulos</h1>
                        {lisArticles}
                    </div>
                );
        }else if(this.state.articles.length === 0 && this.state.status === "success") {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavia no hay contenido en esta session</p>
                </div>
            );
        }else{
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando.........</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            );
        };
    }
}
// Lo exportamos 
export default Articles;