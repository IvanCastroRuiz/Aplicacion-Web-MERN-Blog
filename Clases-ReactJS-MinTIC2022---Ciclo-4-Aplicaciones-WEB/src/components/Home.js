import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

//Defenimos una clase
class Home extends Component {
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        return (
            <div id="home">
                <Slider
                    title="Universidad Pontificia Bolivariana - Desarrollo de Aplicaciones WEB"
                    curso="Ciclo 4  NRC 53848 - 53849"
                    btn="Ir al Blog"
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">......................</h1>
                        <Articles 
                            home="true"
                        />
                    </div>

                    <Sidebar/>

                </div>
            </div>
        )    
    }
}
// Lo exportamos 
export default Home;