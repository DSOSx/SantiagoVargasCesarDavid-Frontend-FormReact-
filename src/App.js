import './App.css';
import './static/estilo.css';
import {useState} from 'react';
import {useEffect} from 'react';

function App() {
  const [nombre,setnombre] = useState("");
  const [datos,setdatos] = useState([]);
  
  function GuardarNombreCampo(event){
    setnombre(event.target.value);
  }

  function BuscarCliente(event){
    event.preventDefault();
    fetch("http://localhost:8092/ServidorCliente",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nombre: nombre})
      })
      .then(response=>response.json())
      .then(data=>BuscarVenta(data))
      .catch(error=>console.log(error))
  }

  function BuscarVenta(data){
    fetch("http://localhost:8092/ServidorVenta",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id: data.id})
    })
    .then(response=>response.json())
    .then(data=>setdatos(data))
    .catch(error=>console.log(error))
  }

  return (
    <div id="div1">
      <form onSubmit={BuscarCliente}>
      <h1>Devoluciones</h1>
      <p>Buscar si la venta existe</p>
      <p>Nombre del cliente:</p>
      <input type="text" placeholder="Nombre del cliente" required onChange={GuardarNombreCampo}></input>
      <button>Buscar</button> 
      </form>
      <div>
      <center>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>folio</th>
              <th>fecha</th>
              <th>costototal</th>
              <th>cantidadpagada</th>
              <th>cambio</th>
              <th>observaciones</th>
              <th>idcliente</th>
              <th>idfactura</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(datos).map((i)=>(
            <tr key={datos[i].id}>
            <td>{datos[i].id}</td>
            <td>{datos[i].folio}</td>
            <td>{datos[i].fecha}</td>
            <td>{datos[i].costototal}</td>
            <td>{datos[i].cantidadpagada}</td>
            <td>{datos[i].cambio}</td>
            <td>{datos[i].observaciones}</td>
            <td>{datos[i].idcliente}</td>
            <td>{datos[i].idfactura}</td>
            <td><button>Realizar Devolución</button></td>
            </tr>
            ))}
          </tbody>
        </table>
        </center>
      </div>
    </div>
  );
}

export default App;
