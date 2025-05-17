const contenidoOfertas = document.querySelector(`.ofertas`);
let datos = [];
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

async function buscarDatos() {
  try {
    let data = await fetch("./scripts/productos.json")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function iniciar() {
  let datos = await buscarDatos();
  //console.log(datos);

  // Filtrar los datos por categoría "Ofertas"
  const ofertas = datos.filter((libro) => libro.categoria.includes("Oferta"));

  // Pintar tarjetas con los datos filtrados de ofertas
  pintarTarjetas(ofertas, contenidoOfertas);

  agregarAlCarrito(datos);
}

iniciar();

function pintarTarjetas(unArray) {
  let ofertas = ``;

  unArray.forEach((libro) => {
    ofertas += `<div class="tarjeta">
                <a href="./producto.html?id=${libro.id}">
                    <img src= ${libro.imagen} alt=${libro.titulo}>

                    <div class="descripcion">
                        <h4>${libro.titulo}</h4>
                        <p>$ ${new Intl.NumberFormat ().format (libro.precio)},00</p>
                    </div>
                </a>

                <button data-id="${libro.id}" class="tarjeta-boton">Agregar al carrito <i class="fi fi-rr-shopping-cart"></i> </button>
            </div>`;
  });
  contenidoOfertas.innerHTML = ofertas;
}

function agregarAlCarrito(unArray) {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("tarjeta-boton")) {
      const id = event.target.dataset.id;

      const producto = unArray.find((producto) => producto.id == id);

      const productoExiste = carrito.find((item) => item.id == id);
      // console.log(productoExiste);

      // suma uno a cantidad cuando se agrega un producto que ya estaba en el localStorage
      if (productoExiste) {
        productoExiste.cantidad++;
      } else {
        const { titulo, imagen, precio } = producto;

        const productoAgregado = {
          id: id,
          titulo: titulo,
          imagen: imagen,
          precio: precio,
          cantidad: 1,
        };

        carrito.push(productoAgregado);
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));

      actualizarCantidad();
    }
  });
}

function actualizarCantidad() {
  let cantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  //console.log(cantidad);
  carro.innerHTML = ` <h4 class="carro-cantidad">${cantidad}</h4>
<a href="./carrito.html"><i class="fi fi-rr-shopping-cart"></i></a>`;
}

actualizarCantidad();
