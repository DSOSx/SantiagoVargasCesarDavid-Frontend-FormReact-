import './App.css';
import './static/estilo.css';
import {useState,useEffect} from 'react';
import Swal from "sweetalert2";

function App() {

  var tiempo=3000;

  const [internet,setinternet] = useState("");

  const [desicion,setdesicion] = useState(0);

  const [usuario,setUsuario] = useState("Cesar");
  const [contrasena,setcontrasena] = useState("1234");

  const [rfc,setrfc] = useState("rfc");
  const [datos,setdatos] = useState([]);

  const [seguimiento,setseguimiento] = useState("x x x x");

  useEffect(() => {
    const interval = setInterval(() => {
      if(navigator.onLine){
         setinternet("Si Hay Internet (El sistema esta funcionando porque detecto internet");
         tiempo=3000;
      } else {
         setinternet("No Hay Internet (El sistema no funciona si no hay internet)");
         tiempo=20000;
         Swal.fire({
           title: "No hay internet, conectese a internet para poder usar el sistema",
           imageUrl: "",
           imageHeight: 200,
           imageWidth: 200,
           showConfirmButton: false
         });
      }
    }, tiempo);
    return () => clearInterval(interval);
  }, []);

  function GuardarUsuario(event){
     setUsuario(event.target.value);
  }

  function GuardarContrasena(event){
     setcontrasena(event.target.value);
  }

  function Login(event){
     event.preventDefault();
     if(usuario=="Cesar" && contrasena=="1234"){
      Swal.fire({
        title: "Bienvenido",
        imageUrl: "https://p4.wallpaperbetter.com/wallpaper/917/971/718/welcome-neon-sign-yellow-snow-wallpaper-preview.jpg",
        imageHeight: 200,
        imageWidth: 400,
        background: "black",
        color: "white"
     }).then(
       function(isconfirm){
         if(isconfirm){
            setdesicion(1);
         }
       }
     );
     } else {
      Swal.fire({
        title: "Datos Incorrectos",
        imageUrl: "https://s3.envato.com/files/236563111/Error%20590x332.jpg",
        imageHeight: 200,
        imageWidth: 400,
        background: "black",
        color: "white"
     }).then(
       function(isconfirm){
         if(isconfirm){
          setdesicion(0);
         }
       }
     );
     }
  }
  
  function GuardarrfcCampo(event){
    setrfc(event.target.value);
  }

  function BuscarCliente(event){
    event.preventDefault();

    fetch("https://client-development.herokuapp.com/api/cliente/"+rfc)
    .then(response=>response.json())
    .then(data=>{
      if(data.data==null){
          Swal.fire({
            title: "El servidor de clientes no encontró ningun rfc de ese cliente",
            imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  setdatos([]);
                  setseguimiento("x x x x");
                }
            });
        } else {
          Swal.fire({
            title: "El servidor de clientes si encontró el rfc de ese cliente",
            imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  BuscarVenta(data.data.id);
                  setseguimiento("s x x x");
                }
            });
        }})
    //.catch(error=>console.log(error))

  }

  function BuscarVenta(id){
    fetch("https://ventas-it-d.herokuapp.com/api/venta/")
    .then(response=>response.json())
    .then(data=>{
      if(data.data==null){
        Swal.fire({
          title: "El servidor de ventas no encontró ninguna venta de ese cliente",
          imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
          imageWidth: 400,
          imageHeight: 200
        }).then(
          function(isconfirm){
              if(isconfirm){
                setdatos([]);
                setseguimiento("x x x x");
              }
          });
      } else {
        Swal.fire({
          title: "Buscando ventas, el proceso puede tardar",
          imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
          imageWidth: 400,
          imageHeight: 200
        }).then(
          function(isconfirm){
              if(isconfirm){
                var ventasdelcliente=[];
                var contador=0;
                for(var i=0;i<data.data.length;i=i+1){
                  if(data.data[i].idCliente==id){
                    ventasdelcliente.push({
                      "id":data.data[i].id,
                      "folio":data.data[i].folio,
                      "costoTotal":data.data[i].costoTotal,
                      "cantidadPagada":data.data[i].cantidadPagada,
                      "cambio":data.data[i].cambio,
                      "observaciones":data.data[i].observaciones,
                      "fecha":data.data[i].fecha,
                      "estado":data.data[i].estado,
                      "estatusDelete":data.data[i].estatusDelete,
                      "idCliente":data.data[i].idCliente,
                      "idFactura":data.data[i].idFactura});
                      contador=contador+1;
                  }
                }
                if(contador<=0){
                  Swal.fire({
                    title: "El servidor de ventas no encontró ninguna venta de dicho cliente",
                    imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
                    imageWidth: 400,
                    imageHeight: 200
                  }).then(
                    function(isconfirm){
                        if(isconfirm){
                          setdatos([]);
                          setseguimiento("x x x x");
                        }}
                );
               } else {
                Swal.fire({
                  title: "El servidor de ventas si encontró venta de dicho cliente",
                  imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
                  imageWidth: 400,
                  imageHeight: 200
                }).then(
                  function(isconfirm){
                      if(isconfirm){
                        setdatos(ventasdelcliente);
                        setseguimiento("s s x x");
                      }}
              );
               }
              }
          });
      }
    })
    //.catch(error=>console.log(error))
  }

  function BuscarTarjeta(event){
       event.preventDefault();
       var idventa = document.getElementById("idventa");
       var idfactura = document.getElementById("idfactura");
       Swal.fire({
         title: "El servidor de trajeta obtuvo con éxito la tarjeta del cliente "+idventa.value+" factura: "+idfactura.value,
         imageUrl: 'https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1',
         imageWidth: 400,
         imageHeight: 200
       }).then(function(isconfirm){
         if(isconfirm){
          BuscarRecibo(1292);
          setseguimiento("s s s x");
         }}
       );
  }

  function BuscarRecibo(idfactura){
    fetch("https://serviciofactura-development.herokuapp.com/api/v1/factura/"+idfactura)
    .then(response=>response.json())
    .then(data=>{
      if(data.data==null){
          Swal.fire({
            title: "El servidor de factura no encontró ninguna factura de ese cliente",
            imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  setseguimiento("x x x x");
                }
            });
        } else {
          Swal.fire({
            title: "El servidor de factura si encontró factura de ese cliente",
            imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  fetch("https://serviciofactura-development.herokuapp.com/api/v1/factura/estado/"+idfactura,{
                    method: "put",
                    headers: {'Content-type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify({estado: false})
                  })
                  .then(response=>response.json())
                  .then(data=>{
                    Swal.fire({
                      title: "La factura "+idfactura+" se ha cancelado",
                      imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
                      imageHeight: 200,
                      imageWidth: 400,
                    })
                  })
                  //.error(error=>console.log(error))
                   setseguimiento("s s s s");
                }
            });
        }})
    //.catch(error=>console.log(error))

  }

  return (
    <div>

    <h1 id="internet">{internet}</h1>

    {desicion === 0 && 
    <div id="div1">
      <form onSubmit={Login}>
      <h1>LOGIN</h1>
      <img id="loginimagen" src="https://wallpapercave.com/wp/wp8008142.jpg"></img><br></br>
      <p>Usuario</p>
      <input type="text" placeholder="Usuario" required onChange={GuardarUsuario} value="Cesar"></input><br></br>
      <p>Contraseña</p>
      <input type="password" placeholder="Contraseña" required onChange={GuardarContrasena} value="1234"></input><br></br>
      <button>Ingresar</button> 
      </form>
    </div>}

    {desicion === 1 && 
    <div id="div2">
      <div>
      {seguimiento === 'x x x x' && <div>
        <img id="Imagenseguiento1" src="http://blog.xtipografias.com/wp-content/uploads/2017/05/cheque-1.png"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-r.jpg"></img>

      </div>}
      {seguimiento === 's x x x' && <div>
        <img id="Imagenseguiento2" src="http://blog.xtipografias.com/wp-content/uploads/2017/05/cheque-1.png"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-r.jpg"></img>
      </div>}
      {seguimiento === 's s x x' && <div>
        <img id="Imagenseguiento2" src="http://blog.xtipografias.com/wp-content/uploads/2017/05/cheque-1.png"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-r.jpg"></img>
      </div>}
      {seguimiento === 's s s x' && <div>
        <img id="Imagenseguiento2" src="http://blog.xtipografias.com/wp-content/uploads/2017/05/cheque-1.png"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-r.jpg"></img>
      </div>}
      {seguimiento === 's s s s' && <div>
        <img id="Imagenseguiento2" src="http://blog.xtipografias.com/wp-content/uploads/2017/05/cheque-1.png"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-r.jpg"></img>
      </div>}
      </div>
      <form onSubmit={BuscarCliente}>
      <h1>Devoluciones</h1>
      <p>Buscar si la venta existe-</p>
      <p>RFC del cliente:</p>
      <input type="text" placeholder="rfc del cliente" required onChange={GuardarrfcCampo}></input>
      <button>Buscar</button> 
      <h2 id="internet">ventas que se obtuvieron de {rfc}</h2>
      </form>
      <div>
      <center>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>folio</th>
              <th>fecha</th>
              <th>estado</th>
              <th>costototal</th>
              <th>cantidadpagada</th>
              <th>cambio</th>
              <th>observaciones.</th>
              <th>estatusDelete</th>
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
            <td>{datos[i].estado}</td>
            <td>{datos[i].costoTotal}</td>
            <td>{datos[i].cantidadPagada}</td>
            <td>{datos[i].cambio}</td>
            <td>{datos[i].observaciones}</td>
            <td>{datos[i].estatusDelete}</td>
            <td>{datos[i].idCliente}</td>
            <td>{datos[i].idFactura}</td>
            <td>
              <form onSubmit={BuscarTarjeta}>
              <input type="text" id="idventa" value={datos[i].id} onChange={GuardarrfcCampo}></input>
              <input type="text" id="idfactura" value={datos[i].idFactura} onChange={GuardarrfcCampo}></input>
              <button>Realizar Devolución</button>
              </form>
            </td>
            </tr>
            ))}
          </tbody>
        </table>
        </center>
      </div>
    </div>}
    </div>
  );
}

export default App;
