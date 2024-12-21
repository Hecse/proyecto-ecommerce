const querySearch = document.location.search;
const id = new URLSearchParams(querySearch).get("id");
const detalle = document.querySelector(`.producto`);
let datos = [];
const carro = document.querySelector(`.carro`);
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
  let libro = datos.find((dato) => dato.id === Number(id));
  // console.log(libro);

  detalle.innerHTML = `
  <div class="producto-tarjeta">
                <div class="producto-imagen">
                    <img src=${libro.imagen} alt=${libro.titulo}>
                </div>

                <div class="producto-detalle">
                <small>${libro.categoria}</small>
                    <div class="titulo">
                        <h3>${libro.titulo}</h3>
                        <h4>${libro.autor}</h4>
                    </div>

                    <div class="precio">
                        <h4>$ ${libro.precio}</h4>
                    </div>

                    <div class="medios-de-pago">
                        <p>Medios de pago</p>
                        <i class="fi fi-brands-visa"></i>
                        <i class="fi fi-brands-paypal"></i>
                        <i class="fi fi-brands-american-express"></i>
                    </div>

                    <button  data-id="${libro.id}"  class="boton-carrito">Agregar al carrito <i class="fi fi-rr-shopping-cart"></i> </button>
                </div>

                <div class="producto-descripcion">
                    <p>${libro.descripcion}</p>
                </div>
            </div>
`;
  agregarAlCarrito(datos);
}

iniciar();

function agregarAlCarrito(unArray) {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("boton-carrito")) {
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

      // Pinta la cantidad de productos en el carrito
      actualizarCantidad();
    }
  });
}

// Pinta la cantidad de productos que hay en el carrito
function actualizarCantidad() {
  let cantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  console.log(cantidad);
  carro.innerHTML = ` <h4 class="carro-cantidad">${cantidad}</h4>
<a href="./carrito.html"><i class="fi fi-rr-shopping-cart"></i></a>`;
}

actualizarCantidad();
