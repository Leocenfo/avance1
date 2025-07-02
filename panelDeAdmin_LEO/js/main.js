let itemId = 1;
const form = document.getElementById("itemForm");
const table = document.querySelector("#itemTable tbody");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${itemId++}</td>
    <td>${nombre}</td>
    <td>${descripcion}</td>
  `;
  table.appendChild(row);
  form.reset();
});
