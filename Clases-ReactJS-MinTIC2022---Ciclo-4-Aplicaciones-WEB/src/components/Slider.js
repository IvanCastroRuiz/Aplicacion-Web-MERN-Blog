import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
//Defenimos una clase
class Slider extends Component {
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        return (
            <div>
                <div id="slider" className={this.props.size}>
                    {/* <h1>Bienvenido al Curso de ReactJS NRC 53848 - 53849</h1> */}
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.curso}</h2>

                    {this.props.btn &&
                        <NavLink to="/blog" className="btn-white">{this.props.btn}</NavLink>
                    }
                    
                </div> 
                
                {/*LIMPIAR FLOTADOS*/}
                <div className="clearfix">
                            
                </div>
            </div>
            )    
    }
}
// Lo exportamos 
export default Slider;