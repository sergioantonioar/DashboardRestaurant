// Elementos del DOM
// Productos por categoría
const productosPorCategoria = {
  ceviches: ["Ceviche Clásico", "Ceviche Mixto", "Ceviche de Pescado"],
  criollos: ["Lomo Saltado", "Ají de Gallina", "Arroz con Pollo"],
  fetucchini: ["Fetucchini Alfredo", "Fetucchini a la Huancaína", "Fetucchini con Pollo"],
  bebidas: ["Coca Cola", "Chicha Morada", "Pisco Sour"]
};

// Precios por producto
const precios = {
  "Ceviche Clásico": 49.00,
  "Ceviche Mixto": 55.00,
  "Ceviche de Pescado": 47.00,
  "Lomo Saltado": 38.00,
  "Ají de Gallina": 32.00,
  "Arroz con Pollo": 28.00,
  "Fetucchini Alfredo": 30.00,
  "Fetucchini a la Huancaína": 33.00,
  "Fetucchini con Pollo": 35.00,
  "Coca Cola": 5.00,
  "Chicha Morada": 6.00,
  "Pisco Sour": 15.00
};

// Elementos del DOM
const categoriasSelect = document.getElementById('categorias-select');
const productosSelect = document.getElementById('productos-select');
const tablaPedidos = document.querySelector('table tbody');
const subtotalCell = document.getElementById('subtotal');
const impuestoCell = document.getElementById('impuesto');
const totalCell = document.getElementById('total');

// Cargar productos según categoría seleccionada
categoriasSelect.addEventListener('change', () => {
  const categoria = categoriasSelect.value;
  productosSelect.innerHTML = '<option>Seleccione un producto...</option>'; // Reiniciar productos

  if (categoria && productosPorCategoria[categoria]) {
      productosPorCategoria[categoria].forEach(producto => {
          const option = document.createElement('option');
          option.value = producto;
          option.textContent = producto;
          productosSelect.appendChild(option);
      });
  }
});

// Agregar producto al carrito
productosSelect.addEventListener('change', () => {
  const producto = productosSelect.value;

  if (producto !== "Seleccione un producto...") {
      const precio = precios[producto];
      const fila = document.createElement('tr');
      fila.innerHTML = `
          <td>${producto}</td>
          <td>1</td>
          <td>S/.${precio.toFixed(2)}</td>
          <td>S/.${precio.toFixed(2)}</td>
          <td>
              <button class="btn btn-success btn-sm action-btn"><i class="fas fa-plus"></i></button>
              <button class="btn btn-danger btn-sm action-btn eliminar"><i class="fas fa-trash eliminar"></i></button>
              <button class="btn btn-info btn-sm action-btn" data-bs-toggle="modal" data-bs-target="#aperturaModalObservacion"><i class="fas fa-eye"></i></button>
          </td>
      `;
      tablaPedidos.appendChild(fila);

      // Actualizar totales
      actualizarTotales();

      // Restablecer el selector
      productosSelect.value = "Seleccione un producto...";
  }
});

// Actualizar totales
function actualizarTotales() {
  let subtotal = 0;

  tablaPedidos.querySelectorAll('tr').forEach(fila => {
      const total = parseFloat(fila.children[3].textContent.replace('S/.', ''));
      subtotal += total;
  });

  const impuesto = subtotal * 0.10;
  const total = subtotal + impuesto;

  subtotalCell.textContent = `S/.${subtotal.toFixed(2)}`;
  impuestoCell.textContent = `S/.${impuesto.toFixed(2)}`;
  totalCell.textContent = `S/.${total.toFixed(2)}`;
}

// Eliminar producto del carrito
tablaPedidos.addEventListener('click', (e) => {
  if (e.target.classList.contains('eliminar')) {
      e.target.closest('tr').remove();
      actualizarTotales();
  }
});

// Limpiar carrito
document.querySelector('.btn-secondary').addEventListener('click', () => {
  tablaPedidos.innerHTML = '';
  actualizarTotales();
});
