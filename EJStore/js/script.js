const servicios = {
  pantallas: [
    { nombre: "Netflix Renovable", precio: "14,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/01-09-2024-1725231983.jpg" },
    { nombre: "Netflix No Renovable", precio: "13,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/01-09-2024-1725231983.jpg" },
    { nombre: "Disney+ Premium", precio: "12,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/05-09-2024-1725495455.jpg" },
    { nombre: "Prime Video", precio: "8,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/09-09-2024-1725848279.jpg" },
    { nombre: "Crunchyroll", precio: "8,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/10-09-2024-1726008246.jpg" },
    { nombre: "Max", precio: "8,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/03-09-2024-1725324040.jpg" },
    { nombre: "Vix Plus", precio: "8,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/03-09-2024-1725324123.jpg" },
  ],
  cuentas: [
    { nombre: "Netflix 5 pantallas", precio: "40,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/01-09-2024-1725231983.jpg" },
    { nombre: "Disney+ Premium", precio: "30,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/05-09-2024-1725495455.jpg" },
    { nombre: "Prime Video", precio: "19,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/09-09-2024-1725848279.jpg" },
    { nombre: "Crunchyroll", precio: "15,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/10-09-2024-1726008246.jpg" },
    { nombre: "HBO Max 3 pantallas", precio: "11,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/03-09-2024-1725324040.jpg" },
    { nombre: "HBO Max 5 pantallas Platino", precio: "24,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/03-09-2024-1725324040.jpg" },
  ],
  television: [
    { nombre: "IPTV 1 Mes", precio: "8,900", img: "	https://mercadostreaming.com/v1/imagenes_plataformas/13-09-2024-1726254118.jpg" },
    { nombre: "Flujo TV", precio: "17,000", img: "https://mercadostreaming.com/v1/imagenes_plataformas/logo.png" },
    { nombre: "Direct+Win", precio: "25,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/17-12-2024-1734477363.1092-7371.jpg.jpg" },
    { nombre: "Apple TV 3 Meses", precio: "17,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/04-02-2025-1738677207.1283-9036.jpg.jpg" },
  ],
  musica: [
    { nombre: "YouTube Premium 3 Meses", precio: "23,500", img: "https://mercadostreaming.com/v1/imagenes_plataformas/17-12-2024-1734477523.7881-1737.jpg.jpg" },
    { nombre: "Spotify Premium 3 Meses", precio: "28,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/17-12-2024-1734477581.9979-1908.jpg.jpg" },
    { nombre: "Spotify Premium 6 Meses", precio: "53,900", img: "https://mercadostreaming.com/v1/imagenes_plataformas/17-12-2024-1734477581.9979-1908.jpg.jpg" },
  ]
};

let serviciosSeleccionados = [];

// Cargar servicios en el selector adicional
function cargarServiciosEnSelector() {
  const selector = document.getElementById('servicioAdicional');
  const todosLosServicios = Object.values(servicios).flat();

  todosLosServicios.forEach(servicio => {
    const option = document.createElement('option');
    option.value = servicio.nombre;
    option.textContent = `${servicio.nombre} - $${servicio.precio} COP`;
    selector.appendChild(option);
  });
}

// Agregar un servicio adicional al carrito
function agregarServicio() {
  const selector = document.getElementById('servicioAdicional');
  const servicioSeleccionado = selector.value;

  if (!servicioSeleccionado) {
    alert('Por favor selecciona un servicio.');
    return;
  }

  const servicioEncontrado = Object.values(servicios).flat().find(item => item.nombre === servicioSeleccionado);

  if (!serviciosSeleccionados.includes(servicioEncontrado)) {
    serviciosSeleccionados.push(servicioEncontrado);
    actualizarListaServicios();
  } else {
    alert('Este servicio ya ha sido agregado.');
  }
}

// Actualizar la lista de servicios seleccionados
function actualizarListaServicios() {
  const lista = document.getElementById('servicioSeleccionado');
  lista.innerHTML = serviciosSeleccionados
    .map(servicio => `${servicio.nombre} - $${servicio.precio} COP`)
    .join('<br>');
  actualizarPrecioTotal();
}

// Actualizar el precio total con descuento
function actualizarPrecioTotal() {
  const cantidad = parseInt(document.getElementById('cantidad').value) || 1;
  const precioTotal = serviciosSeleccionados.reduce((total, servicio) => {
    return total + parseInt(servicio.precio.replace(',', ''));
  }, 0) * cantidad;

  const descuento = serviciosSeleccionados.length >= 3 ? precioTotal * 0.05 : 0;
  const totalConDescuento = precioTotal - descuento;

  document.getElementById('precioTotal').innerText = `Precio Total: $${precioTotal.toLocaleString()} COP`;
  document.getElementById('descuento').innerText = `Descuento: $${descuento.toLocaleString()} COP`;
  document.getElementById('totalConDescuento').innerText = `Total con Descuento: $${totalConDescuento.toLocaleString()} COP`;
}

// Confirmar compra con servicios adicionales y descuento
function confirmarCompra() {
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const medioPago = document.querySelector('input[name="medioPago"]:checked').value;
  const precioTotal = serviciosSeleccionados.reduce((total, servicio) => {
    return total + parseInt(servicio.precio.replace(',', ''));
  }, 0) * cantidad;
  const descuento = serviciosSeleccionados.length >= 3 ? precioTotal * 0.05 : 0;
  const totalConDescuento = precioTotal - descuento;

  const numero = "+573228676059"; // Tu número de WhatsApp
  const mensaje = `
    ¡Hola! Quiero comprar los siguientes servicios:
    ${serviciosSeleccionados.map(servicio => `- ${servicio.nombre}`).join('\n')}
    - Cantidad: ${cantidad}
    - Precio Total: $${precioTotal.toLocaleString()} COP
    - Descuento: $${descuento.toLocaleString()} COP
    - Total con Descuento: $${totalConDescuento.toLocaleString()} COP
    - Medio de Pago: ${medioPago}
  `;

  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, "_blank");
  cerrarModal();
}

// Cerrar el modal
function cerrarModal() {
  serviciosSeleccionados = [];
  document.getElementById('servicioSeleccionado').innerHTML = '';
  document.getElementById('modalCompra').style.display = 'none';
}

// Cargar servicios al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarServicios(); // Cargar los servicios en las categorías
  cargarServiciosEnSelector(); // Cargar los servicios en el selector adicional
});

function cargarServicios() {
  for (let categoria in servicios) {
    let container = document.getElementById(categoria);
    if (!container) {
      console.warn(`No se encontró un contenedor con el ID "${categoria}".`);
      continue;
    }

    servicios[categoria].forEach(servicio => {
      let card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${servicio.img}" alt="${servicio.nombre}">
        <div class="info">
          <h3>${servicio.nombre}</h3>
          <p>$${servicio.precio} COP</p>
          <button onclick="comprar('${servicio.nombre}')">Comprar</button>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

function comprar(servicioNombre) {
  // Buscar el servicio seleccionado en el objeto `servicios`
  const servicioEncontrado = Object.values(servicios).flat().find(servicio => servicio.nombre === servicioNombre);

  if (!servicioEncontrado) {
    alert('El servicio seleccionado no existe.');
    return;
  }

  // Limpiar la lista de servicios seleccionados y agregar el servicio actual
  serviciosSeleccionados = [servicioEncontrado];

  // Mostrar los detalles del servicio en el modal
  document.getElementById('servicioSeleccionado').innerHTML = `
    Servicio: ${servicioEncontrado.nombre} - Precio: $${servicioEncontrado.precio} COP
  `;

  // Restablecer la cantidad a 1 y actualizar el precio total
  document.getElementById('cantidad').value = 1;
  actualizarPrecioTotal();

  // Mostrar el modal
  document.getElementById('modalCompra').style.display = 'flex';
}