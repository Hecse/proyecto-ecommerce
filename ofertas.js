const contenidoOfertas = document.querySelector(`.ofertas`);

async function buscarDatos() {
  try {
    let data = await fetch("./productos.json")
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
  console.log(datos);

  // Filtrar los datos por categoría "Ofertas" 
  const ofertas = datos.filter(libro => libro.categoria.includes("Oferta"));

  // Pintar tarjetas con los datos filtrados de ofertas 
  pintarTarjetas(ofertas, contenidoOfertas);
}

iniciar();

function pintarTarjetas(unArray) {
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
