import React, { Component } from "react";
// Exportamos las dependencias necesarias
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// Exportamos Componentes para las rutas utiles
import Header from "./components/Header";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Search from "./components/Search";
import Article from "./components/Article";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";
import Formulario from "./components/Formulario";
import Peliculas from "./components/Peliculas";
import Footer from "./components/Footer";
// Exportamos Componentes para las rutas
// import MiComponente from './components/MiComponente';
import Receta from "./components/Receta";
import Estado from "./components/Estado";
import SliderProps from "./components/SliderProps";
import Error from "./components/Error";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />

        {/*Configuracion de rutas y Paginas*/}
        <Switch>
          <Route exact path="/home" component={Home} />{" "}
          <Route exact path="/" component={Home} />{" "}
          <Route exact path="/blog" component={Blog} />{" "}
          <Route exact path="/blog/articulo/:id" component={Article} />{" "}
          <Route exact path="/blog/busqueda/:search" component={Search} />{" "}
          <Route exact path="/blog/crear" component={CreateArticle} />{" "}
          <Route exact path="/blog/editar/:id" component={EditArticle} />{" "}
          <Route
            exact
            path="/redirect/:search"
            render={(props) => {
              var search = props.match.params.search;
              return <Redirect to={"/blog/busqueda/" + search} />;
            }}
          />{" "}
          <Route exact path="/peliculas" component={Peliculas} />{" "}
          <Route exact path="/formulario" component={Formulario} />{" "}
          <Route exact path="/receta" component={Receta} />{" "}
          {/* Rutas de pruebas */}{" "}
          <Route exact path="/estado" component={Estado} />{" "}
          <Route exact path="/sliderprops" component={SliderProps} />{" "}
          <Route
            exact
            path="/prueba/:id"
            render={(props) => {
              var id = props.match.params.id;
              return (
                <div id="content">
                  <h1 className="subheader"> Pagina de pruebas </h1>
                  <h2> {id} </h2>
                </div>
              );
            }}
          />{" "}
          <Route
            exact
            path="/pruebas/:nombre/:apellidos?"
            render={(props) => {
              var nombre = props.match.params.nombre;
              var apellidos = props.match.params.apellidos;
              return (
                <div id="content">
                  <h1 className="subheader"> Pagina de pruebas </h1>{" "}
                  <h2>
                    {" "}
                    {nombre && !apellidos && (
                      <React.Fragment> {nombre}</React.Fragment>
                    )}{" "}
                    {nombre && apellidos && (
                      <React.Fragment>
                        {" "}
                        {nombre} {apellidos}
                      </React.Fragment>
                    )}{" "}
                  </h2>{" "}
                </div>
              );
            }}
          />
          <Route component={Error} />
        </Switch>
        {/*LIMPIAR FLOTADOS*/}
        <div className="clearfix"> </div>
        <Footer />
      </BrowserRouter>
    );
  }
}
// Lo exportamos
export default Router;
