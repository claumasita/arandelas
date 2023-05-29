class Producto{
    constructor(codigo, medida, tipo, d_e, d_i, esp, c_kg, observ){
        this.codigo  = codigo;
        this.medida  = medida;
        this.tipo    = tipo;
        this.d_e     = d_e;
        this.d_i     = d_i;
        this.esp     = esp;
        this.c_kg    = c_kg;
        this.observ  = observ;
    }
}

// const productos = [];

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
    
    // const objetos = getSessionStorageToArray("productos");
    // console.log(objetos);
    // if ( objetos.length > 0 ){return};

    let rutaJson = "./json/articulos.json";

    try {
        const resp      = await fetch(rutaJson);
        const productos = await resp.json();
        guardarProductosStorage(JSON.stringify(productos));
    } catch (error) {
        console.log(error);
    }
}

//******************************************************************//
// Función Principal
//******************************************************************//
const inicio = async () =>{
    // Carga de Productos
    await cargarProductos();
}

//******************************************************************//
//                      INICIO DEL PROGRAMA                         //
//******************************************************************//
inicio();