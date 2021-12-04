import React, {Component} from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';
//Defenimos una clase
class Peliculas extends Component {
    state = {
        peliculas: [
            {titulo: "Batman Vs SuperMan",
             image: "https://i2.wp.com/hipertextual.com/wp-content/uploads/2016/03/batman-v-superman-8-scaled.jpg?w=1560&ssl=1"   
            },
            {titulo: "Gran Torino",
             image: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2017/04/624099-coches-miticos-ford-gran-torino.jpg?itok=LjEd55Ip"   
            },
            {titulo: "Maradona",
             image: "https://www.cronista.com/files/image/332/332813/60ac70559b51e_700_387!.webp?s=1f487d08fc29b29fddeeb9cc70ec09f1&d=1621913687&oe=jpg"   
            },
            {titulo: "Game Of Thrones",
             image: "https://www.latercera.com/resizer/ft8cCLZCkSViCAp5Oel-vpBuVYU=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/QNOPJG7Z65FTVIC5P626BMVDEY.jpg"   
            }
        ],
        propietario: "NRC 53848 - 53849"
    }
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        console.log(this.state);
        return (
            <React.Fragment>
                <Slider
                title="Peliculas"
                size="slider-small"
                />

                <div className="center">
                    <div id="content">
                        <h1>Listados de peliculas</h1>
                        <p>Seleccion de peliculas favoritas de {this.state.propietario}</p>
                        {/*Crear el componente de peliclas*/}
                        {
                            this.state.peliculas.map((pelicula, i) => {
                                return (
                                    <Pelicula key={i} pelicula={pelicula} />   
                                )  
                            })
                        }
                    </div>

                    <Sidebar
                        blog="false"
                    />

                </div>
            </React.Fragment>
            )    
    }
}
// Lo exportamos 
export default Peliculas;