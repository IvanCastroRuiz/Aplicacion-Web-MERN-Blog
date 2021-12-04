import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
class htmlFormulario extends Component {
    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtrosRef = React.createRef();
    state = {
        user:{}
    };
    recibirFormulario = (e) => {
        e.preventDefault();
        var genero = "";
        if(this.generoHombreRef.current.checked){
            genero = this.generoHombreRef.current.value
        }else if(this.generoMujerRef.current.checked){
            genero = this.generoMujerRef.current.value
        }else{
            genero = this.generoOtrosRef.current.value
        }
        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            biografia: this.bioRef.current.value,
            genero: genero
        };

        this.setState({
            user: user
        });
        console.log(user);
    }
    render() {
        if(this.state.user.nombre){
                var user = this.state.user
        }
        return (
            <div id="Formulario">
                <Slider
                    title="Formulario"
                    size="slider-small"
                />
                <div classNameName="center">
                    <div id="content">
                        {/*Mostrar los datos del formulario*/}
                        {this.state.user.nombre && this.state.user.apellidos && this.state.user.biografia && this.state.user.genero &&
                            <div id="user-data">
                                <p>Nombre: <strong>{user.nombre}</strong> </p>
                                <p>Apellidos: <strong>{user.apellidos}</strong> </p>
                                <p>Biografia: <strong>{user.biografia}</strong> </p>
                                <p>Genero: <strong>{user.genero}</strong> </p>
                            </div>
                        }
                        {/*Crear un Formulario*/}
                        <form className="mid-form" onSubmit={this.recibirFormulario} OnChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>
                            <div className="htmlForm-group">
                                <label htmlFor="apellido">Apellido</label>
                                <input type="text" name="apellido" ref={this.apellidosRef}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref= {this.bioRef}></textarea>
                            </div>
                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref= {this.generoHombreRef} />Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} />Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoOtrosRef}/>Otro
                            </div>
                            {/* <!-- LIMPIAR FLOTADOS --> */}
                            <div className="clearfix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success"/>
                        </form>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </div>
        )    
    }
}
// Lo exportamos 
export default htmlFormulario;