
const firebaseConfig = {
    apiKey: "AIzaSyBq1GJsP9UL7j3HeEl7yNQz9_rx8iSCiXE",
    authDomain: "reto-setours.firebaseapp.com",
    databaseURL: "https://reto-setours.firebaseio.com",
    projectId: "reto-setours",
    storageBucket: "",
    messagingSenderId: "992659890449",
    appId: "1:992659890449:web:e5ff28344c3cc2c8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//DOM
 const btnGuardar = document.getElementById('btn-guardar');
 const btnCerrar = document.getElementById('btn-cerrar');

 btnGuardar.addEventListener('click',() => {
    const documentoFinal = document.getElementById('text-document-final').value
    const RazonSocial = document.getElementById('text-razon-social').value
    const RazonComercial = document.getElementById('text-razon-comercial').value
    const direccion = document.getElementById('text-direccion').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    const selectPersona = document.getElementById('select-persona').value
    const selectCadena = document.getElementById('select-cadena').value
    const selectPais = document.getElementById('select-pais').value
    const selectCiudad = document.getElementById('select-ciudad').value
    createCloud(documentoFinal, RazonSocial, RazonComercial, selectPersona, selectCadena, selectPais, selectCiudad);

 })

const createCloud = (item1,item2, item3, item4, item5) => {
  return firebase.firestore().collection("proveedores").add({
      DocumentoFinal: item1,
      RazonSocial: item2,
      RazonComercial: item3,
      Tipo: item3,
      Nombre: item4,
      pais: item5,
      ciudad: item6,
      estado: Activo
    })
  };

  const deletePost = (id) => { //este id tiene que ser el de cuando haga click en borrar (no olvidar hacer la confirmación)
    return firebase.firestore().collection("proveedores").doc(id).delete()
  };

  export const editPost = (idMuro,item3, item4, item6) => {
  let muroRef = firebase.firestore().collection("proveedores").doc(idMuro);
    // Restablecer el post que publique en el muro
     return muroRef.update({
        Tipo: item3,
      Nombre: item4,
      Estado: item6
  }

  const changePost = (callback) => {
    return firebase.firestore().collection("proveedores") //.where("state", "==", "CA")
      .onSnapshot((provedor) => {
          const data = [];
          provedor.forEach((doc) => {
              data.push({id: doc.id, ...doc.data()});
          });
        callback(data);
      });
  }

  const publicarProveedor = () => {
    const hall = document.querySelector('#insert-proveedor'); // se elimina el .then()
    firebase.firestore().collection("proveedores").onSnapshot((querySnapshot) => { // get() es reemplazado por onSnapshot() para que muestre las actualizacion en tiempo real.
        hall.innerHTML = ''; //para que solo se agreguen los post que cuelgo (uno por uno).
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().ciudad}`);
            hall.innerHTML += ` 
             <table> 
              <p data-id-post="${doc.id}" disabled> ${doc.data().DocumentoFinal} </p>
              <p  disabled> ${doc.data().RazonSocial} </p>
              <p  disabled> ${doc.data().RazonComercial} </p>
              
             </table> 
               
        });