const contenidoOfertas = document.querySelector(`.ofertas`);
const contenidoNovedades = document.querySelector(`.novedades`);
const contenidoPromociones = document.querySelector(`.promociones`);

async function buscarDatos() {
  try {
    let data = await fetch("./productos.json")
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return data;
    /* console.log(data); */
  } catch (error) {
    console.error(error);
  }
}

async function iniciar() {
  let datos = await buscarDatos();
  console.log(datos);

  /* pintarTarjetas(datos) */

 // Filtrar los datos por categoría "Ofertas" 
 const ofertas = datos.filter(libro => libro.categoria.includes("Oferta"));

 // Pintar tarjetas con los datos filtrados de ofertas 
 pintarTarjetasOfertas(ofertas, contenidoOfertas);

  // Filtrar los datos por categoría "Promociones" 
  const promociones = datos.filter(libro => libro.categoria.includes("Promocion"));

  // Pintar tarjetas con los datos filtrados de promociones 
  pintarTarjetasPromociones(promociones, contenidoPromociones);

  // Filtrar los datos por categoría "Novedades" 
  const novedades = datos.filter(libro => libro.categoria.includes("Novedad"));

  // Pintar tarjetas con los datos filtrados de novedades 
  pintarTarjetasNovedades(novedades, contenidoNovedades);
}

iniciar();

function pintarTarjetasOfertas(unArray) {
  let ofertas = ``;

  unArray.forEach((libro) => {
    ofertas += `<div class="tarjeta">
                <a href="./producto.html">
                    <img src= ${libro.imagen} alt=${libro.titulo}>

                    <div class="descripcion">
                        <h4>${libro.titulo}</h4>
                        <p>Precio $ ${libro.precio}</p>
                    </div>
                </a>

                <button class="tarjeta-boton">Agregar al carrito <i class="fi fi-rr-shopping-cart"></i> </button>
            </div>`;
  });
  contenidoOfertas.innerHTML = ofertas;
}

function pintarTarjetasPromociones(unArray) {
  let promociones = ``;

  unArray.forEach((libro) => {
    promociones += `<div class="tarjeta">
                <a href="./producto.html">
                    <img src= ${libro.imagen} alt=${libro.titulo}>

                    <div class="descripcion">
                        <h4>${libro.titulo}</h4>
                        <p>Precio $ ${libro.precio}</p>
                    </div>
                </a>

                <button class="tarjeta-boton">Agregar al carrito <i class="fi fi-rr-shopping-cart"></i> </button>
            </div>`;
  });
  contenidoPromociones.innerHTML = promociones;
}


function pintarTarjetasNovedades(unArray) {
  let novedades = ``;

  unArray.forEach((libro) => {
    novedades += `<div class="tarjeta">
                <a href="./producto.html">
                    <img src= ${libro.imagen} alt=${libro.titulo}>

                    <div class="descripcion">
                        <h4>${libro.titulo}</h4>
                        <p>Precio $ ${libro.precio}</p>
                    </div>
                </a>

                <button class="tarjeta-boton">Agregar al carrito <i class="fi fi-rr-shopping-cart"></i> </button>
            </div>`;
  });
  contenidoNovedades.innerHTML = novedades;
}