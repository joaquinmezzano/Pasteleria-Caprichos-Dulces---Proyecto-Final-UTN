var tabActual = 0;
mostrarTab(tabActual);

function mostrarTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("btnAnterior").style.display = "none";
  } else {
    document.getElementById("btnAnterior").style.display = "inline";
    document.getElementById("btnAnterior").innerHTML = "Volver";
  }

  if (n == (x.length - 1)) {
    document.getElementById("btnSiguiente").innerHTML = "Enviar";
    document.getElementById("btnSiguiente").removeAttribute("onclick");
    document.getElementById("btnSiguiente").addEventListener("click", enviarFormulario);
  } else {
    document.getElementById("btnSiguiente").innerHTML = "Siguiente";
    document.getElementById("btnSiguiente").setAttribute("onclick", "cambiarPrev(1)");
    document.getElementById("btnSiguiente").removeEventListener("click", enviarFormulario);
  }

  arreglarIndicador(n)
}

function cambiarPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validarForm()) return false;
  x[tabActual].style.display = "none";
  tabActual = tabActual + n;

  if (tabActual >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }

  mostrarTab(tabActual);
  if (tabActual === 2 && validarForm()) {
    mostrarTab(3);
  }

}

function validarForm() {
    var x, y, i, valido = true;
    x = document.getElementsByClassName("tab");
    y = x[tabActual].getElementsByTagName("input");
    
    if (y.length === 0) {
        y = x[tabActual].getElementsByTagName("select");
    }

    for (i = 0; i < y.length; i++) {
        if (y[i].hasAttribute("required")) {
            if (y[i].tagName.toLowerCase() === 'select') {
                if (y[i].value === "") {
                    y[i].className += " invalido";
                    valido = false;
                }
            } else if (y[i].type === 'checkbox') {
                if (!y[i].checked) {
                    y[i].className += " invalido";
                    valido = false;
                }
            } else {
                if (y[i].value === "") {
                    y[i].className += " invalido";
                    valido = false;
                }
            }
        }
    }

    if (valido) {
        document.getElementsByClassName("step")[tabActual].className += " finish";

        if (tabActual === 2) {
            capturarDatos();
        }
    }

    return valido;
}

function arreglarIndicador(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}

document.getElementById('opcionesR').addEventListener('change', function() {
    var seleccion = this.value;

    for (var i = 1; i <= 10; i++) {
        document.getElementById('infoOpcion' + (i < 10 ? '0' : '') + i).style.display = 'none';
    }

    if (seleccion !== '') {
        document.getElementById('infoOpcion' + seleccion.slice(1)).style.display = 'flex';
        document.getElementById('infoOpcion' + seleccion.slice(1)).classList.add("infoProducto");
        document.getElementById('confirmacion').classList.remove('invisible');
    }
});

function capturarDatos() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var dia = document.getElementById('dia').value;
    var mes = document.getElementById('mes').value;
    var anno = document.getElementById('anno').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var opcionesR = document.getElementById('opcionesR');
    var opcionReclamo = opcionesR.value;
    var textoOpcionReclamo = opcionesR.options[opcionesR.selectedIndex].text;


    var datosUsuario = {
        nombre: nombre,
        apellido: apellido,
        dia: dia,
        mes: mes,
        anno: anno,
        email: email,
        telefono: telefono,
        opcionReclamo: opcionReclamo,
        textoOpcionReclamo: textoOpcionReclamo
    };

    mostrarDatos(datosUsuario);
}

function mostrarDatos(datos) {
    var contenedorDatos = document.getElementById('datosMostrados');

    contenedorDatos.innerHTML = `
        <p class="subtitulos">Datos Ingresados</p>
        <p>Nombre: ${datos.nombre}</p>
        <p>Apellido: ${datos.apellido}</p>
        <p>Fecha de Nacimiento: ${datos.dia}/${datos.mes}/${datos.anno}</p>
        <p>Email: ${datos.email}</p>
        <p>Teléfono: ${datos.telefono}</p>
        <p>Opción de Reclamo: ${datos.textoOpcionReclamo}</p>
    `;
    
    mostrarTab(tabActual);
}

function enviarFormulario() {
    alert("¡Formulario enviado con éxito!");
    window.location.href = "../index.html";
}