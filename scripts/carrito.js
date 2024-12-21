let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carro = document.querySelector(`.carro`);
const carritoProductos = document.querySelector(".carrito-productos");
const carritoTotal = document.querySelector("#total");

function renderizarCarrito() {
  carritoProductos.innerHTML = ``;

  carrito.forEach((libro) => {
    const productos = ` <div class="carrito-producto" data-id="${libro.id}">
                  <img class="carrito-producto-imagen" src="${
                    libro.imagen
                  }" alt="${libro.titulo}">
                  
                  <div class="carrito-producto-titulo">
                      <small>Título</small>
                      <h4>${libro.titulo}</h4>
                  </div>
  
                  <div>
                      <small>Cantidad</small>
  
                      <div class="carrito-producto-cantidad">
                      <button data-id="${
                        libro.id
                      }" class="carrito-producto-restar"><p> - </p></button>
                      <h4 class="cantidad"> ${libro.cantidad} </h4>
                      <button data-id="${
                        libro.id
                      }" class="carrito-producto-sumar"><p> + </p></button>
                      </div>                    
                  </div>
  
                  <div class="carrito-producto-precio">
                      <small>Precio</small>
                      <h4>$ ${libro.precio}</h4>
                  </div>
  
                  <div class="carrito-producto-subtotal">
                      <small>Subtotal</small>
                      <h4 class="subtotal">$ ${
                        libro.precio * libro.cantidad
                      }</h4>
                  </div>
  
                  <button data-id="${
                    libro.id
                  }" class="carrito-producto-eliminar">
                      <i class="fi fi-rr-trash"></i>
                  </button>
              </div>`;
    carritoProductos.innerHTML += productos;
  });

  actualizarTotal();
}

// Elimina un producto
document.addEventListener("click", (event) => {
  if (event.target.closest(".carrito-producto-eliminar")) {
    const button = event.target.closest(".carrito-producto-eliminar");
    const id = button.dataset.id;
    console.log(id);

    const productoIndex = carrito.findIndex((producto) => producto.id == id);
    console.log(productoIndex);

    if (productoIndex !== -1) {
      carrito.splice(productoIndex, 1);

      localStorage.setItem("carrito", JSON.stringify(carrito));

      button.closest(".carrito-producto").remove();

      actualizarCantidad();
      actualizarTotal();
    }
  }
});

// Elimina todos los productos
document
  .querySelector(".boton-vaciar-carrito")
  .addEventListener("click", function () {
    localStorage.removeItem("carrito");
    carritoProductos.innerHTML = ``;
    carro.innerHTML = ` <h4 class="carro-cantidad">0</h4>
    <a href="./carrito.html"><i class="fi fi-rr-shopping-cart"></i></a>`;
    carritoTotal.innerHTML = `$ 0`;
  });

// Actualiza el numerito de cantidad de productos
function actualizarCantidad() {
  let cantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  // console.log(cantidad);
  carro.innerHTML = ` <h4 class="carro-cantidad">${cantidad}</h4>
  <a href="./carrito.html"><i class="fi fi-rr-shopping-cart"></i></a>`;
}

actualizarCantidad();

// Actualiza el total de la compra
function actualizarTotal() {
  const sumaTotal = carrito.reduce(
    (acc, producto) => acc + producto.cantidad * producto.precio,
    0
  );
  carritoTotal.innerHTML = `$ ${sumaTotal}`;
  // console.log(sumaTotal);
}

// Restar uno a la cantidad de un producto
function restarAlCarrito() {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".carrito-producto-restar")) {
      const button = event.target.closest(".carrito-producto-restar");
      const id = button.dataset.id;

      const productoExiste = carrito.find((item) => item.id == id);
      // console.log(productoExiste);

      if (productoExiste) {
        if (productoExiste.cantidad > 1) {
          productoExiste.cantidad--;
        }
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));

      actualizarCantidad();
      actualizarTotal();
      renderizarCarrito();
    }
  });
}

// Suma uno a la cantidad de un producto
function sumarAlCarrito() {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".carrito-producto-sumar")) {
      const button = event.target.closest(".carrito-producto-sumar");
      const id = button.dataset.id;

      const productoExiste = carrito.find((item) => item.id == id);
      // console.log(productoExiste);

      if (productoExiste) {
        if (productoExiste.cantidad > 0) {
          productoExiste.cantidad++;
        }
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));

      actualizarCantidad();
      actualizarTotal();
      renderizarCarrito();
    }
  });
}

renderizarCarrito();
actualizarCantidad();
restarAlCarrito();
sumarAlCarrito();
