import './assets/css/App.css';
// Importamos el componente
import Router from './Router';
// function presentacion(grupos, año){
//   const presentacion = <div>
//                             <h2>Desarrollo de aplicaciones WEB, {grupos} <br/></h2>
//                             <h3>Formador: Ivan Castro Ruiz</h3>
//                             <h4> {año} </h4>
//                       </div>
//   return presentacion;
// };
// Componente principal que trae el FrameWorks
function App() {
  // const grupos = 'NRC 53848 - 53849';
  return (
    <div className="App">
        <Router/> {/* Componente de Rutas y paginas */}
    </div>
  );
}
export default App;
