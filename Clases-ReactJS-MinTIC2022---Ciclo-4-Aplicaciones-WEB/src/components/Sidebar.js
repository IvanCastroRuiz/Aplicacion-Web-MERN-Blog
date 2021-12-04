import React, {Component} from 'react';
import { Redirect, NavLink } from 'react-router-dom';
//Defenimos una clase
class Siderbar extends Component {
    searchRef = React.createRef();
    state = {
        search: "",
        redirect:  false        
    }
    redirectToSearch = (e) => {
        e.preventDefault();
        // console.log(e);
        this.setState({
            search: this.searchRef.current.value,    
            redirect: true
        });
    }
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render(){
        if(this.state.redirect){
            return(
                <Redirect to={'/redirect/'+this.state.search} />
            );
        }
        return (
               <aside id="sidebar">
                    {this.props.blog === "true" &&
                        <div id="nav-blog" className="sidebar-item">
                            <h3>
                                Puedes hacer esto
                            </h3>
                            <NavLink to="blog/crear" className="btn btn-success">Crear articulos</NavLink>
                        </div>
                    }    
                    <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra el articulo que buscas</p>
                        <fieldset>
                            <form action="" onSubmit={this.redirectToSearch}>
                                <input type="text" name="search" ref={this.searchRef} />
                                <input type="submit" name="submit" value="Buscar" className="btn"/>
                            </form>
                        </fieldset>
                    </div>
                </aside>       
        );    
    };
}
// Lo exportamos 
export default Siderbar;