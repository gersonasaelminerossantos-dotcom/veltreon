
const WEBHOOK_URL = "https://discord.com/api/webhooks/1562925628624478298/QolP17fVr9FjPx4f5BOIjOOlMSIuW-nk85ksEsPwuKnlzJ5daMXsqUobId5NwJdjOyZD";

const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById("customerName").value.trim(),
        telefono: document.getElementById("customerPhone").value.trim(),
        servicio: document.getElementById("serviceType").value,
        fecha: document.getElementById("serviceDate").value,
        salida: document.getElementById("pickup").value.trim(),
        destino: document.getElementById("destination").value.trim(),
        vehiculo: document.getElementById("chosenVehicle").value.trim() || "No especificado",
        precio: document.getElementById("bookingPrice").value.trim() || "No especificado",
        pago: document.getElementById("paymentMethod").value,
        detalles: document.getElementById("extraDetails").value.trim() || "Sin detalles"
    };

    const mensaje = {
        embeds: [{
            title: "🚘 Nueva reserva | VELTRÉON",
            color: 15844367,
            fields: [
                { name: "Nombre", value: datos.nombre },
                { name: "Teléfono", value: datos.telefono },
                { name: "Servicio", value: datos.servicio },
                { name: "Fecha", value: datos.fecha },
                { name: "Lugar de salida", value: datos.salida },
                { name: "Destino", value: datos.destino },
                { name: "Conductor o vehículo", value: datos.vehiculo },
                { name: "Precio estimado", value: datos.precio },
                { name: "Método de pago", value: datos.pago },
                { name: "Detalles adicionales", value: datos.detalles }
            ].map(campo => ({
                name: campo.name,
                value: String(campo.value).slice(0, 1024),
                inline: false
            })),
            footer: { text: "VELTRÉON · Solicitud pendiente de confirmación" },
            timestamp: new Date().toISOString()
        }]
    };

    const boton = form.querySelector('button[type="submit"]');
    const textoOriginal = boton.innerHTML;

    boton.disabled = true;
    boton.textContent = "Enviando reserva...";

    try {
        const respuesta = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mensaje)
        });

        if (!respuesta.ok) {
            throw new Error("Discord respondió con error: " + respuesta.status);
        }

        alert("¡Reserva enviada correctamente! Tu solicitud está pendiente de confirmación.");
        form.reset();

    } catch (error) {
        console.error("Error al enviar la reserva:", error);
        alert("No se pudo enviar la reserva a Discord. Verifica el webhook y tu conexión.");

    } finally {
        boton.disabled = false;
        boton.innerHTML = textoOriginal;
    }
});
