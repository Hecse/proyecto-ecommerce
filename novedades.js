const contenidoNovedades = document.querySelector(`.novedades`);

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

  // Filtrar los datos por categoría "Novedades" 
  const novedad = datos.filter(libro => libro.categoria.includes("Novedad"));

  // Pintar tarjetas con los datos filtrados de novedad 
  pintarTarjetas(novedad, contenidoNovedades);
}

iniciar();

function pintarTarjetas(unArray) {
  let novedad = ``;

  unArray.forEach((libro) => {
    novedad += `<div class="tarjeta">
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
  contenidoNovedades.innerHTML = novedad;
}
