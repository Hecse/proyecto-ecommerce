const carro = document.querySelector(`.carro`);
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const formulario = document.querySelector("form");
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
})

// Pinta la cantidad de productos que hay en el carrito
function actualizarCantidad() {
    let cantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    console.log(cantidad);
    carro.innerHTML = ` <h4 class="carro-cantidad">${cantidad}</h4>
  <a href="./carrito.html"><i class="fi fi-rr-shopping-cart"></i></a>`;
  }
  
  actualizarCantidad();

  // Validacion del formulario

  /* formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.querySelector("#nombre");
    const correo = document.querySelector("#correo");
    const consulta = document.querySelector("#consulta");
    const nombreError = document.querySelector("#nombre-error");
    console.log(nombre.value.length);
    
    if (nombre.value.length < 3) {
      nombreError.textContent = "El nombre debe tener mas de dos caracteres";
    }

  }) */