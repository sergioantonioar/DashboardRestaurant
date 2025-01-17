// Datos de las órdenes
const orders = [
    { id: 20, customer: "JORGE", timer: 90, items: [{ plato: "Pecho c/ Ala Broaster", cantidad: 1, detalles: "Cremas, Ensalada, Aparte" }, { plato: "Pescado Pampanito", cantidad: 1, detalles: "Papas sancochadas" }] },
    { id: 21, customer: "TEFY F", timer: 150, items: [{ plato: "Chicha Morada 1/2 LT", cantidad: 1 }, { plato: "1/4 Pollo Broaster Pecho", cantidad: 1 }] },
    { id: 22, customer: "MANUEL", timer: 200, items: [{ plato: "Caldo Pierna", cantidad: 1 }] },
    { id: 23, customer: "MARÍA", timer: 300, items: [{ plato: "Arroz Chaufa", cantidad: 2 }] },
    { id: 24, customer: "JUAN", timer: 400, items: [{ plato: "Lomo Saltado", cantidad: 1 }] },
    { id: 25, customer: "CARLOS", timer: 550, items: [{ plato: "Ceviche Mixto", cantidad: 1 }] },
];

// Generar colores según el tiempo
function getTimerClass(timer) {
    if (timer <= 300) return "badge-success"; // Verde (1-5 min)
    if (timer <= 540) return "badge-warning"; // Amarillo (5-9 min)
    return "badge-danger"; // Rojo (>10 min)
}

// Convertir segundos a formato mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Generar tarjetas dinámicamente
function renderOrders() {
    const container = document.querySelector(".row");
    container.innerHTML = ""; // Limpiar contenido anterior
    orders.forEach(order => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("col-md-4");
        orderCard.innerHTML = `
            <div class="order-card">
                <div class="header">
                    <div>
                        <div class="order-number">#${order.id} - ${order.customer}</div>
                        <div class="order-timer">
                            <span class="badge ${getTimerClass(order.timer)}">${formatTime(order.timer)}</span>
                        </div>
                    </div>
                    <button class="btn btn-sm consolidate-btn ${getTimerClass(order.timer)}" data-id="${order.id}">Consolidar</button>
                </div>
                <div class="order-details">
                    ${order.items.map(item => `
                        <ul class="list-inline ms-2">
                            <li><strong>PLATO:</strong> ${item.plato}</li>
                            <li><strong>Cantidad:</strong> ${item.cantidad}</li>
                            <li>${item.detalles || ""}</li>
                        </ul>
                    `).join("")}
                </div>
                <button class="btn btn-primary dispatch-btn" data-id="${order.id}">Despachar</button>
            </div>
        `;

        container.appendChild(orderCard);
    });
}

// Consolidar órdenes
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("consolidate-btn") || e.target.classList.contains("dispatch-btn")) {
        const orderId = parseInt(e.target.getAttribute("data-id"), 10);
        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
            orders.splice(orderIndex, 1); // Eliminar orden de la lista
            renderOrders(); // Renderizar nuevamente
        }
    }
});

// Renderizar inicialmente
renderOrders();
// Actualizar el reloj en tiempo real
function actualizarReloj() {
    const reloj = document.getElementById("reloj");
    const ahora = new Date();

    const horas = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    const segundos = ahora.getSeconds().toString().padStart(2, "0");

    reloj.textContent = `${horas}:${minutos}:${segundos}`;
}

// Inicializar el reloj
setInterval(actualizarReloj, 1000);
actualizarReloj();
