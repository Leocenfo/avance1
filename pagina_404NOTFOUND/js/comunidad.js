// variables globales
let areasComunes = []; // almacena las áreas comunes registradas
let marcadores = []; // almacena los marcadores en el mapa
let mapa;
let datosTemporales = null; 

// Acceso al DOM
const inputNombre = document.getElementById("nombre");
const inputFecha = document.getElementById("fecha");
const inputComentario = document.getElementById("comentario");
const btnAgregar = document.getElementById("btn-agregar");
const tabla = document.getElementById("tabla-lugares");

// Inicializar el mapa centrado en una ubicación por defecto
function inicializarMapa(){
    // Coordenadas por defecto (puedes cambiarlas)
    mapa = L.map("mapa").setView([9.90692, -83.98789], 15);
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    mapa.on("click", onMapaClick);
}

// Registrar datos y esperar el click en el mapa
function registrarAreaComun(){
    const nombre = inputNombre.value;
    const fecha = inputFecha.value;
    const comentario = inputComentario.value;

    if(nombre && fecha && comentario){
        datosTemporales = {nombre, fecha, comentario};
        alert("Por favor, haz click en el mapa para ubicar el área común.");
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Manejo del click en el mapa
function onMapaClick(event){
    if(!datosTemporales) return;

    const areaComun = {
        nombre: datosTemporales.nombre,
        fecha: datosTemporales.fecha,
        comentario: datosTemporales.comentario,
        lat: event.latlng.lat,
        lng: event.latlng.lng   
    };

    areasComunes.push(areaComun);
    agregarMarcador(areaComun);
    mostrarAreasComunes();

    datosTemporales = null;
    limpiarFormulario();
}

// Crear marcador en el mapa
function agregarMarcador(area){
    const marcador = L.marker([area.lat, area.lng])
        .addTo(mapa)
        .bindPopup(`<b>${area.nombre}</b><br><small>Registrado: ${area.fecha}</small><br>${area.comentario}`);
    marcadores.push(marcador);
}

// Mostrar áreas en la tabla
function mostrarAreasComunes(){
    tabla.innerHTML = "";

    areasComunes.forEach((area, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <td>${area.nombre}</td>
        <td>${area.fecha}</td>
        <td>${area.comentario}</td>
        <td class="acciones">
            <button type="button" data-accion="ver" data-index="${index}">Ver</button>
            <button type="button" data-accion="editar" data-index="${index}">Editar</button>
            <button type="button" data-accion="eliminar" data-index="${index}">Eliminar</button>
        </td>
        `;

        tabla.appendChild(fila);
    });
}

// Limpiar formulario
function limpiarFormulario(){
    inputNombre.value = "";
    inputFecha.value = "";
    inputComentario.value = "";
}

// Eliminar área común
function eliminarArea(index){
    if(confirm("¿Estás seguro de eliminar esta área común?")){
        areasComunes.splice(index, 1);
        mapa.removeLayer(marcadores[index]);
        marcadores.splice(index, 1);
        mostrarAreasComunes();
    }
}

// Editar área común
function editarArea(index){
    const area = areasComunes[index];
    inputNombre.value = area.nombre;
    inputFecha.value = area.fecha;
    inputComentario.value = area.comentario;

    eliminarArea(index);
    datosTemporales = {
        nombre: area.nombre,
        fecha: area.fecha,
        comentario: area.comentario,
    };

    alert("Por favor, haz click en el mapa para ubicar el área común.");
}

// Ver área común en el mapa
function verArea(index){
    const area = areasComunes[index];
    mapa.setView([area.lat, area.lng], 18);
    marcadores[index].openPopup();
}

// Event listeners
tabla.addEventListener('click', (event) => {
    const boton = event.target;
    if(boton.tagName !== "BUTTON") return;

    const accion = boton.dataset.accion;
    const index = parseInt(boton.dataset.index);

    if(accion === "eliminar") eliminarArea(index);
    if(accion === "editar") editarArea(index);
    if(accion === "ver") verArea(index);
});

btnAgregar.addEventListener("click", registrarAreaComun);

// Inicializar el mapa cuando cargue la página
document.addEventListener("DOMContentLoaded", inicializarMapa);
 /* Menu de hamburguesa para header*/

document.getElementById('menuCambio').addEventListener('click', function() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
});