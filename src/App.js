/**  
* Documentacion de interfaces y clases 
* @author Santiago Vargas Cesar David
* @author Nayeli
* @author Rolando
* @version 5 - 21 de junio del 2022
*/

import './App.css';
import './static/estilo.css';
import {useState,useEffect, version} from 'react';
import Swal from "sweetalert2";

/** 
   * @Component App
   * @param Ningun parametro de entrada
   * @returns Un componente
   * @Exception la funcion te manda un error de que no encontrĂ³ ningun <div></div>
   */
function App() {

  var tiempo=3000;

  const [internet,setinternet] = useState("");

  const [desicion,setdesicion] = useState(0);

  const [usuario,setUsuario] = useState("");
  const [contrasena,setcontrasena] = useState("");

  const [rfc,setrfc] = useState("rfc");
  const [datos,setdatos] = useState([]);

  const [foliofactura,setfoliofactura] = useState("");
  const [datos2,setdatos2] = useState([]);

  const [datos3,setdatos3] = useState([]);
 
  const [seguimiento,setseguimiento] = useState("x x x x x x");

  const [token,settoken] = useState("");

  /** 
   * @Component useEffect
   * @param Ningun parametro de entrada
   * @returns 
   * @Exception Ninguna
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if(navigator.onLine){
         setinternet("Si Hay Internet (El sistema esta funcionando porque detecto internet)");
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

  /** 
   * @Component GuardarUsuario
   * @param event
   * @returns nada
   * @Exception Ninguna
   */
  function GuardarUsuario(event){
     setUsuario(event.target.value);
  }

  /** 
   * @Component useEffect
   * @param Ningun.parametro.de.entrada
   * @returns 
   * @Exception Ninguna
   */
  function GuardarContrasena(event){
     setcontrasena(event.target.value);
  }

  function Login(event){
     event.preventDefault();

      fetch("https://autenticacion-p.herokuapp.com/login/auth/user",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"usernameOrEmail":usuario, "password":contrasena})
      })
     .then(response=>response.json())
     .then(data=>{
         if(data.data.length==0){
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
         } else {
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

                settoken(data.data);
                setseguimiento("s x x x x x");
                setdesicion(1);
             }
           }
         );
         }
     })
  }
  
  function GuardarrfcCampo(event){
    setrfc(event.target.value);
  }

  function BuscarCliente(event){
    event.preventDefault();

    fetch("https://client-app-d.herokuapp.com/api/cliente/"+rfc,{
    method: 'GET', 
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    }})
    .then(response=>response.json())
    .then(data=>{
      if(data.data==null){
          Swal.fire({
            title: "El servidor de clientes no encontrĂ³ ningun rfc de ese cliente",
            imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  setdatos([]);
                  setseguimiento("x x x x x x");
                }
            });
        } else {
          Swal.fire({
            title: "El servidor de clientes si encontrĂ³ el rfc de ese cliente",
            imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  BuscarVenta(data.data.rfc);
                  setseguimiento("s s x x x x");
                }
            });
        }})

  }

  function BuscarVenta(rfc){

    fetch("https://ventas-it-t.herokuapp.com/api/venta",{
      method: 'GET', 
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      }
     })
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
    });

    fetch("https://ventas-it-t.herokuapp.com/api/venta",{
      method: 'GET', 
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      }
     })
    .then(response=>response.json())
    .then(data=>{
      if(data.data==null){
        Swal.fire({
          title: "El servidor de ventas no encontrĂ³ ninguna venta de ese cliente",
          imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
          imageWidth: 400,
          imageHeight: 200
        }).then(
          function(isconfirm){
              if(isconfirm){
                setdatos([]);
                setseguimiento("x x x x x x");
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
                  if(data.data[i].rfc==rfc){
                    ventasdelcliente.push({
                      "id":data.data[i].id,
                      "folio":data.data[i].folio,
                      "costoTotal":data.data[i].costoTotal,
                      "cantidadPagada":data.data[i].cantidadPagada,
                      "cambio":data.data[i].cambio,
                      "observaciones":data.data[i].observaciones,
                      "fecha":data.data[i].fecha,
                      "estado":data.data[i].estado,
                      "rfc":data.data[i].rfc,
                      "idFactura":data.data[i].idFactura});
                      contador=contador+1;
                  }
                }
                if(contador<=0){
                  Swal.fire({
                    title: "El servidor de ventas no encontrĂ³ ninguna venta de dicho cliente",
                    imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
                    imageWidth: 400,
                    imageHeight: 200
                  }).then(
                    function(isconfirm){
                        if(isconfirm){
                          setdatos([]);
                          setseguimiento("x x x x x x");
                        }}
                );
               } else {
                Swal.fire({
                  title: "El servidor de ventas si encontrĂ³ venta de dicho cliente",
                  imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
                  imageWidth: 400,
                  imageHeight: 200
                }).then(
                  function(isconfirm){
                      if(isconfirm){
                        setdatos(ventasdelcliente);
                        setseguimiento("s s s x x x");
                      }}
              );
               }
              }
          });
      }
    })
  }

  function BuscarEnPagos(event){
       event.preventDefault();

       fetch("https://payment-d.herokuapp.com/api/payment/records")
       .then(response=>response.json())
       .then(data=>console.log(data))

       fetch("https://payment-d.herokuapp.com/api/payment/records")
       .then(response=>response.json())
       .then(data=>{
         var foliofacturas="";
         var Encontrado=false;
         for(var i=0;i<data.length;i=i+1){
            if(data[i].referenceID==event.target[0].value){
              foliofacturas=data[i].saleID
              Encontrado=true;
            }
         }
         if(Encontrado==true){
          Swal.fire({
            title: "El servidor de pagos si encontrĂ³ venta",
            imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  setseguimiento("s s s s x x");
                  ConfirmarCancelacion(foliofacturas);
                }}
        );
         } else {
          Swal.fire({
            title: "El servidor de pagos no encontrĂ³ ninguna venta",
            imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  setseguimiento("x x x x x x");
                }}
        );
         }
       })

  }

  function ConfirmarCancelacion(foliofacturas){
    Swal.fire({
      title: "Estas Seguro que quieres realizar esta acciĂ³n????",
      imageUrl: "https://www.lifeder.com/wp-content/uploads/2018/10/question-mark-2123967_640.jpg",
      imageHeight: 200,
      imageWidth: 400,
      showCancelButton: true,
      confirmButtonText: "Si, estoy seguro",
      cancelButtonText: "Cancelar",
    }).then(function(isconfirm){
      if(isconfirm.value){

       Swal.fire({
         title: "Nombre: "+usuario,
         input: "password",
         showCancelButton: true,
         confirmButtonText: "Confirmar",
         cancelButtonText: "Cancelar",
      })
      .then(condiciones => {
      if (condiciones.value) {
        if(condiciones.value==contrasena){
          Swal.fire({
           title: "Realizando la siguiente acciĂ³n",
           imageUrl: 'https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1',
           imageWidth: 400,
           imageHeight: 200
          }).then(function(isconfirm){
            if(isconfirm){
             BuscarRecibo(foliofacturas);
            }}
          );
        } else {
          Swal.fire({
            title: "La contraseĂ±a no es correcta",
            imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                }
            });
        }
      } else {

      }
      });

      } else {
      }
    });
  }

  function BuscarRecibo(foliofacturas){

    foliofacturas=3;
    fetch("https://serviciofactura-development.herokuapp.com/api/v1/factura/"+foliofacturas)
    .then(response=>response.json())
    .then(data=>{
      if(data.data==null){
          Swal.fire({
            title: "El servidor de factura no encontrĂ³ ninguna factura de ese cliente",
            imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  setseguimiento("x x x x x x");
                }
            });
        } else {
          Swal.fire({
            title: "El servidor de factura si encontrĂ³ factura de ese cliente",
            imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  fetch("https://serviciofactura-development.herokuapp.com/api/v1/factura/estado/"+foliofacturas,{
                    method: "put",
                    headers: {'Content-type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify({estado: false})
                  })
                  .then(response=>response.json())
                  .then(data=>{
                    Swal.fire({
                      title: "La factura "+foliofacturas+" se ha cancelado",
                      imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
                      imageHeight: 200,
                      imageWidth: 400,
                    })
                  })
                   setseguimiento("s s s s s x");
                   InsertarDatosEnLaBase(foliofacturas,data.data.fecha);
                }
            });
        }})
  }

  function BusquedaPorRecibos(event){
      event.preventDefault();
      var mostrarventana = document.getElementById("Otraventana");
      mostrarventana.click();
  }

  function GuardarFolioFactura(event){
     setfoliofactura(event.target.value);
  }

  function BuscandoFacturitas(event){
      event.preventDefault();
      fetch("https://serviciofactura-development.herokuapp.com/api/v1/factura/"+foliofactura)
    .then(response=>response.json())
    .then(data=>{
      if(data.data==null){
          Swal.fire({
            title: "El servidor de factura no encontrĂ³ ninguna factura",
            imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  setdatos2([]);
                }
            });
        } else {
          Swal.fire({
            title: "El servidor de factura si encontrĂ³ factura",
            imageUrl: "https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                  var d = new Date(data.data.fecha);
                  data.data.fecha=""+(d.getDate()+1)+"/"+(d.getUTCMonth()+1)+"/"+d.getUTCFullYear();
                  setdatos2([data.data]);
                }
            });
        }})
  }
  
  function CancelarRecibodirectamente(event){
      event.preventDefault();

      Swal.fire({
        title: "Estas Seguro que quieres realizar esta acciĂ³n????",
        imageUrl: "https://www.lifeder.com/wp-content/uploads/2018/10/question-mark-2123967_640.jpg",
        imageHeight: 200,
        imageWidth: 400,
        showCancelButton: true,
        confirmButtonText: "Si, estoy seguro",
        cancelButtonText: "Cancelar",
      }).then(function(isconfirm){
        if(isconfirm.value){

          Swal.fire({
             title: "Nombre: "+usuario,
             input: "password",
             showCancelButton: true,
             confirmButtonText: "Confirmar",
             cancelButtonText: "Cancelar",
          })
          .then(condiciones => {
          if (condiciones.value) {
            if(condiciones.value==contrasena){
              Swal.fire({
                title: "El servidor de trajeta obtuvo con Ă©xito la tarjeta de la factura: "+event.target[0].value,
                imageUrl: 'https://i1.wp.com/tekzup.com/wp-content/uploads/2018/06/me-gusta-predecir.jpg?fit=1280%2C720&ssl=1',
                imageWidth: 400,
                imageHeight: 200
              }).then(function(isconfirm){
                if(isconfirm){
                 BuscarRecibo2(event.target[0].value);
                }}
              );
            } else {
              Swal.fire({
                title: "La contraseĂ±a no es correcta",
                imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
                imageWidth: 400,
                imageHeight: 200
              }).then(
                function(isconfirm){
                    if(isconfirm){
                    }
                });
            }
          } else {

          }
          });

        } else {
        }
      });

  }

  function BuscarRecibo2(idfactura){

    fetch("https://serviciofactura-development.herokuapp.com/api/v1/factura/"+idfactura)
    .then(response=>response.json())
    .then(data=>{
      if(data.data==null){
          Swal.fire({
            title: "El servidor de factura no encontrĂ³ ninguna factura de ese cliente",
            imageUrl: "https://www.lacomunidaddeltaller.es/wp-content/uploads/2019/06/golferio.jpeg",
            imageWidth: 400,
            imageHeight: 200
          }).then(
            function(isconfirm){
                if(isconfirm){
                }
            });
        } else {
          Swal.fire({
            title: "El servidor de factura si encontrĂ³ factura de ese cliente",
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
                    InsertarDatosEnLaBase(idfactura,data.data.fecha);
                }
            });
        }})

  }

  function VerCapturasCanceladas(event){
      event.preventDefault();
      var cargar = document.getElementById("Otraventana2");
      cargar.click();
      fetch("https://sprint-boot-devoluciones.herokuapp.com/get")
      .then(response=>response.json())
      .then(data=>{
        if(data==null){
              setdatos3([]);
          } else {
              for(var i=0;i<data.length;i=i+1){
                var d = new Date(data[i].fechacancelacion);
                data[i].fechacancelacion=""+(d.getDate()+1)+"/"+(d.getUTCMonth()+1)+"/"+d.getUTCFullYear();
                var d = new Date(data[i].fechafacturacion);
                data[i].fechafacturacion=""+(d.getDate()+1)+"/"+(d.getUTCMonth()+1)+"/"+d.getUTCFullYear();
              }
              setdatos3(data);
          }

        })
  }

  function BuscarTarjeta(event){
    event.preventDefault();
}

  function InsertarDatosEnLaBase(idfactura,fechafactura){
    let date = new Date()
    let fecha = null;
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if(month < 10){
    fecha=(`${year}-0${month}-${day}`)
    }else{
    fecha=(`${year}-${month}-${day}`)
    }
  
    fetch("https://sprint-boot-devoluciones.herokuapp.com/post",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
		"rfccliente": "LDDLDL",
		"rfcfacturacion": idfactura,
		"idventa": "333",
		"nombrecancelo": usuario,
		"fechacancelacion": fecha,
		"fechafacturacion": fechafactura
	})})
     .then(response=>response.json())
     .then(data=>console.log(data))
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
      <input type="text" placeholder="Usuario" required onChange={GuardarUsuario}></input><br></br>
      <p>ContraseĂ±a</p>
      <input type="password" placeholder="ContraseĂ±a" required onChange={GuardarContrasena}></input><br></br>
      <button>Ingresar</button> 
      </form>
    </div>
    }

    {desicion === 1 && 
    <div id="div2">
    <h2><a href="./index.html">Cerrar Sesion</a></h2>
      <div>
      {seguimiento === 'x x x x x x' && <div>
        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-l.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-c.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-p.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-f.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>

      </div>}
      {seguimiento === 's x x x x x' && <div>
      <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-l.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-c.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-p.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-f.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>
      
      </div>}
      {seguimiento === 's s x x x x' && <div>
      <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-l.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-c.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-p.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-f.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>

       </div>}
      {seguimiento === 's s s x x x' && <div>
        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-l.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-c.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-p.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-f.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>

      </div>}
      {seguimiento === 's s s s x x' && <div>
      <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-l.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-c.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-p.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-f.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>
      
      </div>}
      {seguimiento === 's s s s s x' && <div>
        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-l.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-c.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-p.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-f.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento1" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>

      </div>}
      {seguimiento === 's s s s s s' && <div>
        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-l.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-c.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-v.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-p.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-f.jpg"></img>
        <img id="Imagenseguiento3" src="https://cdn-icons-png.flaticon.com/512/776/776845.png"></img>

        <img id="Imagenseguiento2" src="https://letrascursivas.com/wp-content/uploads/2020/08/letra-cursiva-mayuscula-t.jpg"></img>

      </div>}

      </div>
      <form onSubmit={BuscarCliente}>
      <h1>Devoluciones</h1>
      <p>%% Bienvenido: {usuario} %%</p>
      <p>Buscar si la venta existe</p>
      <p>RFC del cliente:</p>
      <input type="text" placeholder="rfc del cliente" required onChange={GuardarrfcCampo} id="input1"></input>
      <button>Buscar Por ventas</button> 
      </form>
      <form onSubmit={BusquedaPorRecibos}>
      <button>Buscar Por Facturas</button>
      </form>
      <form onSubmit={VerCapturasCanceladas}>
      <button>Ver Las Facturas Canceladas</button>
      </form>

      <h2 id="internet">ventas que se obtuvieron de {rfc}</h2>
      <div>
      <center>
        <table id="table1">
          <thead id="thead1">
            <tr id="tr1">
              <th id="th1">Id Venta</th>
              <th id="th1">Folio</th>
              <th id="th1">Fecha</th>
              <th id="th1">Estado</th>
              <th id="th1">Costo Total</th>
              <th id="th1">Cantidad Pagada</th>
              <th id="th1">Cambio</th>
              <th id="th1">Observaciones.</th>
              <th id="th1">Rfc Cliente</th>
              <th id="th1">Cancelar Factura</th>
            </tr>
          </thead>
          <tbody id="tbody1">
            {Object.keys(datos).map((i)=>(
            <tr key={datos[i].id} id="tr1">
            <td id="td1">{datos[i].id}</td>
            <td id="td1">{datos[i].folio}</td>
            <td id="td1">{datos[i].fecha}</td>
            <td id="td1">{datos[i].estado}</td>
            <td id="td1">{datos[i].costoTotal}</td>
            <td id="td1">{datos[i].cantidadPagada}</td>
            <td id="td1">{datos[i].cambio}</td>
            <td id="td1">{datos[i].observaciones}</td>
            <td id="td1">{datos[i].rfc}</td>
            <td id="td1">
              <form onSubmit={BuscarEnPagos}>
              <input type="text" id="idcliente" value={datos[i].folio} onChange={BuscarEnPagos}></input>
              <button>Realizar DevoluciĂ³n</button>
              </form>
            </td>
            </tr>
            ))}
          </tbody>
        </table>
        </center>
      </div>

      <a id="Otraventana" href="#otro">dame click y aparezco</a>
      <div id="otro">
      <form onSubmit={BuscandoFacturitas}>
      <h2 id="internet2">Buscar Facturas que se obtuvieron de {rfc}</h2>
      <a href="#" id="salidadetabla">Regresar A la Tabla Anterior</a>
      <p id="p144">Folio de la factura:</p>
      <input type="text" placeholder="Folio de la factura" required onChange={GuardarFolioFactura} id="campo111"></input>
      <button id="button2">Buscar</button> 
      </form>
        <center>
        <table id="table2">
          <thead id="thead2">
          <tr id="tr2">
              <th id="th2">Folio</th>
              <th id="th2">Razon Social Empresa</th>
              <th id="th2">Direccion</th>
              <th id="th2">Cp</th>
              <th id="th2">Correo</th>
              <th id="th2">Telefono</th>
              <th id="th2">Rfc</th>
              <th id="th2">Regimen Fiscal</th>
              <th id="th2">Fecha</th>
              <th id="th2">Folio Fiscal</th>
              <th id="th2">Certificado Digital</th>
              <th id="th2">Serie Cerificado SAT</th>
              <th id="th2">Estado</th>
              <th id="th2">Id Pago</th>
              <th id="th2">Rfc Cliente</th>
              <th id="th2">Serie Certificado Sat</th>
              <th id="th2">Cancelar Recibo</th>
            </tr>
          </thead>
          <tbody id="tbody2">
            {Object.keys(datos2).map((j)=>(
            <tr key={datos2[j].folio} id="tr2">
            <td id="td2">{datos2[j].folio}</td>
            <td id="td2">{datos2[j].razonSocialEmpresa}</td>
            <td id="td2">{datos2[j].direccion}</td>
            <td id="td2">{datos2[j].cp}</td>
            <td id="td2">{datos2[j].correo}</td>
            <td id="td2">{datos2[j].telefono}</td>
            <td id="td2">{datos2[j].rfc}</td>
            <td id="td2">{datos2[j].regimenFiscal}</td>
            <td id="td2">{datos2[j].fecha}</td>
            <td id="td2">{datos2[j].folioFiscal}</td>
            <td id="td2">{datos2[j].certificadoDigital}</td>
            <td id="td2">{datos2[j].serieCertificadoSat}</td>
            <td id="td2">{datos2[j].estado}</td>
            <td id="td2">{datos2[j].idPago}</td>
            <td id="td2">{datos2[j].rfcCliente}</td>
            <td id="td2">{datos2[j].serieCertificadoSat}</td>
            <td id="td2">
              <form onSubmit={CancelarRecibodirectamente}>
              <input type="text" id="idfactura2" value={datos2[j].folio} onChange={CancelarRecibodirectamente}></input>
              <button>Cancelar Factura</button>
              </form>
            </td>
            </tr>
            ))}
          </tbody>
        </table>
        </center>

      </div>

      <a id="Otraventana2" href="#otro2">dame click y aparezco</a>
      <div id="otro2">
      <h2 id="internet3">Cancelaciones de facturas</h2>
      <a href="#" id="salidadetabla">Regresar A la Tabla Anterior</a>
        <center>
        <table id="table3">
          <thead id="thead3">
          <tr id="tr3">
              <th id="th3">Id</th>
              <th id="th3">Rfc Facturacion</th>
              <th id="th3">Responsable de la cancelaciĂ³n</th>
              <th id="th3">Fecha de facturacion</th>
              <th id="th3">Fecha de cancelacion</th>
            </tr>
          </thead>
          <tbody id="tbody3">
            {Object.keys(datos3).map((k)=>(
            <tr key={datos3[k].id} id="tr3">
            <td id="td3">{datos3[k].id}</td>
            <td id="td3">{datos3[k].rfcfacturacion}</td>
            <td id="td3">{datos3[k].nombrecancelo}</td>
            <td id="td3">{datos3[k].fechafacturacion}</td>
            <td id="td3">{datos3[k].fechacancelacion}</td>
            </tr>
            ))}
          </tbody>
        </table>
        </center>

      </div>

    </div>
    }
    </div>
  );
}

export default App;
