import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

//Defenimos una clase
class Blog extends Component {
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        
        return (
            <div id="home">
                <Slider
                    title="Blog"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/*Listado de artiulos que vendran del api rest de node*/}

                        <Articles/>

                    </div>

                    <Sidebar
                        blog="true"
                    />

                </div>
            </div>
        )    
    }
}
// Lo exportamos 
export default Blog;