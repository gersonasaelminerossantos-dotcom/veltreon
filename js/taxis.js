
function mostrarTaxis() {
    const grid = document.getElementById("taxiGrid");
    if (!grid || !window.TAXIS) return;

    grid.innerHTML = window.TAXIS.map((taxi, index) => {
        const initials = taxi.driver.split(" ")
            .map(word => word[0]).slice(0, 2).join("");

        return `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <article class="vehicle-card">
                <img class="vehicle-photo" loading="lazy"
                    src="https://images.unsplash.com/photo-${[
                        "1549317661-bd32c8ce0db2",
                        "1552519507-da3b142c6e3d",
                        "1503376780353-7e6692767b70"
                    ][index % 3]}?auto=format&fit=crop&w=700&q=80"
                    alt="${taxi.car}">
                <div class="vehicle-info">
                    <span class="vehicle-tag">TAXI ${String(index + 1).padStart(2,"0")}</span>
                    <div class="driver-line mt-3 mb-3">
                        <div class="driver-avatar">${initials}</div>
                        <div>
                            <strong>${taxi.driver}</strong>
                            <small>Conductor de ejemplo</small>
                        </div>
                    </div>
                    <h3>${taxi.car}</h3>
                    <p>Consulta disponibilidad y detalles del recorrido.</p>
                    <button class="btn btn-outline-gold w-100 select-taxi"
                        data-driver="${taxi.driver}" data-car="${taxi.car}">
                        Consultar servicio
                    </button>
                </div>
            </article>
        </div>`;
    }).join("");
}

document.addEventListener("DOMContentLoaded", mostrarTaxis);
