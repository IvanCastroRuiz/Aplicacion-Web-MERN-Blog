import React, {Component} from 'react';
//Defenimos una clase
class Estado extends Component {
    // Propiedad contador
        state = {
        contador : 0
    }
    // Funciones para Sumar y Restar 
    sumar = (e) =>  {
        this.setState({
            contador: (this.state.contador + 1)    
        })
    };
    restar = (e) => {
        this.setState({
            contador: (this.state.contador - 1)    
        })
    };
    // Metodo render (Se encargara de mostrar la vista al usuario)
    render() {
        return (
                <div>
                    <h3>
                        Contador: {this.state.contador}
                    </h3>    
                        <input type="button" value="Sumar" onClick={this.sumar}/>
                        <input type="button" value="Restar" onClick={this.restar}/>
                </div>
            );
    };
}
// Lo exportamos 
export default Estado;