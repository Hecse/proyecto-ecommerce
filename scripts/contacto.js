const carro = document.querySelector(`.carro`);
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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