import React, {Component} from 'react';
//Defenimos una clase
class Receta extends Component {
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        // Objeto Literal
        const receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate','Queso','Jamon'],
            calorias: 400
        };
        return (
                <div>
                    <h1>{`Receta: ${receta.nombre}`}</h1>
                    <h2>{`Caloria: ${receta.calorias}`}</h2>
                    <ol> {/*Bucle para recorrer el array*/}
                        {
                            receta.ingredientes.map((ingrediente, i) => { 
                                
                                console.log(ingrediente);
                                return ( 
                                    <li key={i}>
                                        {ingrediente}                                        
                                    </li>
                                )                                                   
                            })
                        }    
                    </ol>
                </div>
            )    
    }
}
// Lo exportamos 
export default Receta;