/*
function saludar () {
    alert("hola");
}

btnSiguiente.addEventListener("click", function(){
    alert("adios");
});
*/

function aparecerSiguiente () {
    //PRIMERA FORMA
    //var listaElementosActivos = document.getElementsByClassName("activo");
    //var elementoActivo = listaElementosActivos[0]; //Ya que solo hay 1 elemento activo al mismo tiempo
    
    //FORMA CON QUERYSELECTOR, devuelve el primero del listado, ahorramos código
    var elemActivo = document.querySelector(".activo");
    var elemSiguiente = document.querySelector(".activo + .desactivo") //toma el .activo adyacente al .desactivo
    
    //Condicional en caso de que lleguemos al último elemento
    if (elemSiguiente == null) {
        var primero = document.querySelector(".fondoRojo");
        elemActivo.classList.remove("activo");
        elemActivo.classList.add("desactivo");
        primero.classList.remove("desactivo");
        primero.classList.add("activo");
    }
    
    elemActivo.classList.remove("activo");
    elemActivo.classList.add("desactivo");
    elemSiguiente.classList.add("activo");
    elemSiguiente.classList.remove("desactivo");
}