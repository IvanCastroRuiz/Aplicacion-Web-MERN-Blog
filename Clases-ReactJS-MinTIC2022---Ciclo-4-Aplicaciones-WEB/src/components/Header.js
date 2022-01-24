// Importamos React
import React, {Component} from 'react';
import logo from '../assets/images/logo.svg'
// import logo1 from '../assets/images/logomintic.png'
import { NavLink } from 'react-router-dom';
 
//Defenimos una clase
class Header extends Component {
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        return (
                <header id="header">
                    <div className="center">
                        {/* LOGO */}
                        <div id="logo">
                            <div>
                                <img src={logo} className="app-logo" alt="logotipo"/>
                                {/* <img src={logo1} className="app-logo" alt="logomintic2022"/> */}
                            </div>
                            <div>
                                <span id="brand">
                                    <strong>Blog </strong> Deportivo
                                </span>
                                
                            </div>
                             
                        </div>
                        {/* MENU */}
                        <nav id="menu">
                            <ul>
                                <li>
                                    <NavLink to="/home" activeClassName="active">Inicio</NavLink>
                                </li>
                                <li>
                                    <NavLink to="blog" activeClassName="active">Blog</NavLink>
                                </li>
                                <li>
                                    <NavLink to="formulario" activeClassName="active">Formulario</NavLink>
                                </li>
                                <li>
                                    <NavLink to="peliculas" activeClassName="active">Peliculas</NavLink>
                                </li>
                                <li>
                                    {/* Este link lo vamos a utilizar para realizar pruebas */}
                                    <NavLink to="receta" activeClassName="active">Pagina 2</NavLink>
                                </li>
                            </ul>
                        </nav>

                        {/* LIMPIAR FLOTADOS */}
                        <div className="clearfix">
                            
                        </div>

                    </div>
                </header>            
            )    
    }
}
// Lo exportamos 
export default Header;