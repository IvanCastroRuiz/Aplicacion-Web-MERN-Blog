import React, {Component} from 'react';
//Defenimos una clase
class SliderProps extends Component {
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        console.log(this.props);
        return (
            <div>
                <div id="slider" className="slider-big">
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.grupos}</h2>
                    <a href="index.html" className="btn-white">Ir al Blog</a>
                </div> 
                
                {/*LIMPIAR FLOTADOS*/}
                <div class="clearfix">
                            
                </div>
            </div>
            )    
    }
}
// Lo exportamos 
export default SliderProps;