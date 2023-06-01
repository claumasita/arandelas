//******************************************************************//
// Mostrar Respuesta
//******************************************************************//
const mostrarRespuesta =(title,type)=>{

    Swal.fire({
        width: 350,
        icon: 'success',
        title: 'Mensaje enviado correctamente',
        showConfirmButton: false,
        timer: 2500
    });

}

//******************************************************************//
// Enviar Consulta al e-mail
//******************************************************************//
const enviarMensaje = async (formulario)=>{

    const datos = new FormData(formulario);
    const boton = document.querySelector("#btn-submit");
    boton.classList.add("btn-disabled");

    try {
        const resp = await fetch('./consulta.php',{
            method: 'POST',
            body:   datos
        });
        const respuesta = await resp.json();
        if (respuesta){
            mostrarRespuesta('Mensaje enviado correctamente','success');
        }
    } catch (error) {
        mostrarRespuesta('Error al enviar el mensaje','error');
    }finally{
        boton.classList.remove("btn-disabled");
    }
}

//******************************************************************//
// Proceso Principal (Listener para boton SUBMIT del formulario)
//******************************************************************//
const formulario = document.querySelector("#form-consulta");
formulario.addEventListener("submit" , (e)=>{
    e.preventDefault();
    enviarMensaje(formulario);
});