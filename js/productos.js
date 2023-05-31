class Producto{
    constructor(medida, d_e, d_i, esp){
        this.medida  = medida;
        this.d_e     = d_e;
        this.d_i     = d_i;
        this.esp     = esp;
    }
}

let productos = [];

//******************************************************************//
// Recupera JSON desde SessionStorage
//******************************************************************//
const getJsonSessionStorage=(clave)=>{
    return sessionStorage.getItem(clave);
};

//******************************************************************//
// Convierte JSON (desde SessionStorage) a Array de Objetos
//******************************************************************//
const getSessionStorageToArray=(clave)=>{

    const coleccion = JSON.parse(getJsonSessionStorage(clave));
    if (coleccion != null){
        return coleccion;
    }else{
        return [];
    }
};

//******************************************************************//
// Elimina todos los elementos del Sesion Storage Indicado
//******************************************************************//
const vaciarSessionStorage=(clave)=>{sessionStorage.removeItem(clave);}

//******************************************************************//
// Recibe JSON para almacenar en el SessionStorage
//******************************************************************//
const agregarJsonSessionStorage=(clave, json)=>{
    sessionStorage.setItem(clave, json);
};

//******************************************************************//
// JSON de Productos => almacenar en el SessionStorage
//******************************************************************//
const guardarProductosStorage=(enJson)=>{
    vaciarSessionStorage("productos");
    agregarJsonSessionStorage("productos", enJson);
};

//******************************************************************//
// Agrega los objetos de todos los diseños al Array correspondiente
//******************************************************************//
const cargarProductos = async () =>{

    let rutaJson = "./json/articulos.json";

    try {
        const resp = await fetch(rutaJson);
        productos  = await resp.json();
        guardarProductosStorage(JSON.stringify(productos));
    } catch (error) {
        console.log(error);
    }
}

//******************************************************************//
// Agrega los productos filtrados a la Tabla de Salida
//******************************************************************//
const agregarProductosFiltrados=(productos)=>{
    const tbody = document.querySelector("#filtrados");
    tbody.innerHTML = "";
    productos.forEach(producto => {
        tbody.innerHTML = tbody.innerHTML +
        `
        <tr>
        <td>${producto.medida}</td>
        <td>${producto.d_e}</td>
        <td>${producto.d_i}</td>
        <td>${producto.esp}</td>
        </tr>
        `;
    });
}

//******************************************************************//
// Listener BUSCAR
//******************************************************************//
const buscar=()=>{

    const btnBuscar = document.querySelector("#btn-buscar");
    btnBuscar.addEventListener("click", () =>{
        let prodFiltrados = [];

        // Get Values from Inputs
        const txtDiamExt = parseFloat(document.querySelector("#d-ext").value);
        const txtDiamInt = parseFloat(document.querySelector("#d-int").value);
        const txtEspesor = parseFloat(document.querySelector("#espe").value);

        // Get Tolerances from Inputs
        let txtDiamExtTol = parseFloat(document.querySelector("#d-ext-tol").value);
        let txtDiamIntTol = parseFloat(document.querySelector("#d-int-tol").value);
        let txtEspesorTol = parseFloat(document.querySelector("#espe-tol").value);

        // Set Values for Tolerance isNaN
        if (isNaN(txtDiamExtTol)){txtDiamExtTol = 0;}
        if (isNaN(txtDiamIntTol)){txtDiamIntTol = 0;}
        if (isNaN(txtEspesorTol)){txtEspesorTol = 0;}

        productos.forEach(producto => {
            let prodValido;
            let rangoFrom = 0;
            let rangoTo = 0;

            // Filtro Diametro Exterior
            if (isNaN(txtDiamExt) == false){

                // Rangos
                rangoFrom = txtDiamExt - Math.abs(txtDiamExtTol);
                rangoTo   = txtDiamExt + Math.abs(txtDiamExtTol);
                if  (producto.d_e >= rangoFrom && producto.d_e <= rangoTo){
                    prodValido = true;
                }else{
                    prodValido = false;
                }
            }

            // Filtro Diametro Interior
            if (isNaN(txtDiamInt) == false && prodValido != false){

                // Rangos
                rangoFrom = txtDiamInt - Math.abs(txtDiamIntTol);
                rangoTo   = txtDiamInt + Math.abs(txtDiamIntTol);
                if  (producto.d_i >= rangoFrom && producto.d_i <= rangoTo){
                    prodValido = true;
                }else{
                    prodValido = false;
                }
            }

            // Filtro Espesor
            if (isNaN(txtEspesor) == false && prodValido != false){

                // Rangos
                rangoFrom = txtEspesor - Math.abs(txtEspesorTol);
                rangoTo   = txtEspesor + Math.abs(txtEspesorTol);
                if  (producto.esp >= rangoFrom && producto.esp <= rangoTo){
                    prodValido = true;
                }else{
                    prodValido = false;
                }
            }

            if (prodValido){
                prodFiltrados.push(new Producto(
                    producto.medida,
                    producto.d_e,
                    producto.d_i,
                    producto.esp,
                ));
            }

        });

        agregarProductosFiltrados(prodFiltrados);

    });

}

//******************************************************************//
// Listener LIMPIAR
//******************************************************************//
const btnLimpiar=()=>{

    const btnLimpiar = document.querySelector("#btn-limpiar");
    btnLimpiar.addEventListener("click", () =>{
        const tbody = document.querySelector("#filtrados");
        tbody.innerHTML = "";

        document.querySelector("#d-ext").value = "";
        document.querySelector("#d-int").value = "";
        document.querySelector("#espe").value = "";

        document.querySelector("#d-ext-tol").value = "2.00";
        document.querySelector("#d-int-tol").value = "2.00";
        document.querySelector("#espe-tol").value = "0.20";

    });
}

//******************************************************************//
// Función Principal
//******************************************************************//
const inicio = async () =>{
    // Carga de Productos
    await cargarProductos();
    buscar();
    btnLimpiar();
}

//******************************************************************//
//                      INICIO DEL PROGRAMA                         //
//******************************************************************//
inicio();