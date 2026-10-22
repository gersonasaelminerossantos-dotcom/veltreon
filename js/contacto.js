
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-contacto");

    if (!formulario) {
        console.error("No se encontró el formulario de reserva.");
        return;
    }

    const whatsappEmpresa = "50379208580";

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const obtener = (id) =>
            document.getElementById(id)?.value.trim() || "";

        const nombre = obtener("nombre");
        const telefono = obtener("telefono");
        const servicio = obtener("servicio");
        const vehiculo = obtener("vehiculo");
        const fecha = obtener("fecha");
        const hora = obtener("hora");
        const precio = obtener("precio");
        const metodoPago = obtener("metodo-pago");
        const mensaje = obtener("mensaje");

        if (!nombre || !telefono || !servicio || !fecha || !metodoPago) {
            alert("Completa todos los campos obligatorios.");
            return;
        }

        if (metodoPago === "Transferencia bancaria" && !precio) {
            alert("Selecciona un vehículo con precio antes de continuar.");
            return;
        }

        const texto = [
            "🚘 *NUEVA RESERVA - VELTRÉON*",
            "",
            "*DATOS DEL CLIENTE*",
            `Nombre: ${nombre}`,
            `Teléfono: ${telefono}`,
            "",
            "*DETALLES DE LA RESERVA*",
            `Servicio: ${servicio}`,
            `Vehículo: ${vehiculo || "Por confirmar"}`,
            `Fecha: ${fecha}`,
            `Hora: ${hora || "Por confirmar"}`,
            `Precio indicado: ${precio || "Por confirmar"}`,
            "",
            "*MÉTODO DE PAGO*",
            metodoPago,
            "",
            metodoPago === "Efectivo"
                ? "Solicito confirmar la reserva y el pago en efectivo."
                : "Solicito los datos bancarios oficiales para realizar la transferencia.",
            "",
            `Mensaje adicional: ${mensaje || "Ninguno"}`,
            "",
            "Quedo pendiente de la confirmación de VELTRÉON."
        ].join("\n");

        const url =
            `https://wa.me/${whatsappEmpresa}?text=${encodeURIComponent(texto)}`;

        // Redirige a WhatsApp con la reserva preparada.
        window.location.href = url;
    });
});
