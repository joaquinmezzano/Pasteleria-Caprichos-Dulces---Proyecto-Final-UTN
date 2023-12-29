var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
    document.getElementById("prevBtn").innerHTML = "Volver";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Enviar";
    document.getElementById("nextBtn").removeAttribute("onclick");
    document.getElementById("nextBtn").addEventListener("click", enviarFormulario);
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
    document.getElementById("nextBtn").setAttribute("onclick", "nextPrev(1)");
    document.getElementById("nextBtn").removeEventListener("click", enviarFormulario);
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  if (currentTab === 2 && validateForm()) {
    showTab(3);
  }
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    
    // Intenta obtener el elemento select en lugar del input
    if (y.length === 0) {
        y = x[currentTab].getElementsByTagName("select");
    }

    // A loop that checks every input/select field in the current tab:
    for (i = 0; i < y.length; i++) {
        if (y[i].hasAttribute("required")) {
            // If a field is empty...
            if (y[i].tagName.toLowerCase() === 'select') {
                // Verifica si el valor seleccionado es el valor por defecto (opción deshabilitada)
                if (y[i].value === "") {
                    y[i].className += " invalid";
                    valid = false;
                }
            } else if (y[i].type === 'checkbox') {
                // Si es un checkbox, verifica si está marcado
                if (!y[i].checked) {
                    y[i].className += " invalid";
                    valid = false;
                }
            } else {
                // Si es cualquier otro tipo de input, verifica si el valor está vacío
                if (y[i].value === "") {
                    y[i].className += " invalid";
                    valid = false;
                }
            }
        }
    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";

        if (currentTab === 2) {
            capturarDatos();
        }
    }

    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

//Función para el funcionamiento de las opciones
document.getElementById('opcionesR').addEventListener('change', function() {
    var seleccion = this.value;

    // Oculta todos los elementos
    for (var i = 1; i <= 10; i++) {
        document.getElementById('infoOpcion' + (i < 10 ? '0' : '') + i).style.display = 'none';
    }

    // Muestra el elemento seleccionado
    if (seleccion !== '') {
        document.getElementById('infoOpcion' + seleccion.slice(1)).style.display = 'flex';
        document.getElementById('infoOpcion' + seleccion.slice(1)).classList.add("infoProducto");
        document.getElementById('confirmacion').classList.remove('invisible');
    }
});

function capturarDatos() {
    // Captura los datos desde el formulario
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


    // Almacena los datos en una estructura (en este caso, un objeto)
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

    // Muestra los datos en otra parte del HTML
    mostrarDatos(datosUsuario);
}

function mostrarDatos(datos) {
    // Seleccionar el elemento donde mostrar los datos
    var contenedorDatos = document.getElementById('datosMostrados');

    // Actualizar el contenido con los datos capturados
    contenedorDatos.innerHTML = `
        <p class="subtitulos">Datos Ingresados</p>
        <p>Nombre: ${datos.nombre}</p>
        <p>Apellido: ${datos.apellido}</p>
        <p>Fecha de Nacimiento: ${datos.dia}/${datos.mes}/${datos.anno}</p>
        <p>Email: ${datos.email}</p>
        <p>Teléfono: ${datos.telefono}</p>
        <p>Opción de Reclamo: ${datos.textoOpcionReclamo}</p>
    `;
    
    // Mostrar el tab de datos mostrados
    showTab(currentTab);
}

function enviarFormulario() {
    // Coloca aquí tu lógica de envío de formulario, por ejemplo, redirigir y mostrar una alerta
    alert("¡Formulario enviado con éxito!");
    window.location.href = "../index/index.html"; // Cambia "tu_pagina_destino.html" por la URL que desees
}