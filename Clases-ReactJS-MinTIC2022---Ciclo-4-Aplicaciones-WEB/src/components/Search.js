import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';
//Defenimos una clase
class Search extends Component {
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        var searched = this.props.match.params.search;    
        return (
            <div id="home">
                <Slider
                    title={'Busqueda: '+searched}
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/*Listado de artiulos que vendran del api rest de node*/}
                        <Articles
                            search={searched}
                        />
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
export default Search;