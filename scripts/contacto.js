const carro = document.querySelector(`.carro`);
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const email = {
  nombre: "",
  correo: "",
  consulta: "",
};

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

// Menu hamburguesa
abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

// Pinta la cantidad de productos que hay en el carrito
function actualizarCantidad() {
  let cantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  // console.log(cantidad);
  carro.innerHTML = ` <h4 class="carro-cantidad">${cantidad}</h4>
  <a href="./carrito.html"><i class="fi fi-rr-shopping-cart"></i></a>`;
}

actualizarCantidad();

// Validacion del formulario 2
const nombre = document.querySelector("#nombre");
const nombreError = document.querySelector("#nombre-error");
const correo = document.querySelector("#correo");
const consulta = document.querySelector("#consulta");

nombre.addEventListener("blur", validar);
correo.addEventListener("blur", validar);
consulta.addEventListener("blur", validar);

function validar(e) {
  // console.log(e.target.parentElement);
  if (e.target.value.trim() === "") {
    escribirMensaje(
      `Por favor indique un ${e.target.id}`,
      e.target.parentElement
    );
    return;
  }
  if (e.target.id === "correo" && !validarEmail(e.target.value)) {
    escribirMensaje("El email no es valido", e.target.parentElement);
    return;
  }
  borrarAlerta(e.target.parentElement);
  email[e.target.name] = e.target.value.trim().toLowerCase();
  console.log(email)

  comprobarEmail()
}

function escribirMensaje(mensaje, referencia) {
  borrarAlerta(referencia);

  const error = document.createElement("P");
  error.textContent = mensaje;

  error.classList.add("error");

  referencia.appendChild(error);
}

function borrarAlerta(referencia) {
  const alerta = referencia.querySelector(".error");
  if (alerta) {
    alerta.remove();
  }
}

function validarEmail(email) {
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  const resultado = validEmail.test(email);
  return resultado;
}

/* function comprobarEmail() {
  if(Object.values(email).includes("")) {

  } else {

  }
} */