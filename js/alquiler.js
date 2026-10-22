
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("rentalSections");
    const filters = document.getElementById("filters");
    const search = document.getElementById("vehicleSearch");
    const count = document.getElementById("resultCount");

    if (!container || !filters || !search) return;

    let category = "Todos";

    function render() {
        const query = search.value.trim().toLowerCase();
        const categories = ["Económico", "Lujo", "Deportivo"];
        let total = 0;
        let html = "";

        categories.forEach(cat => {
            if (category !== "Todos" && category !== cat) return;

            const vehicles = window.VEHICULOS.filter(v =>
                v.category === cat &&
                (v.name.toLowerCase().includes(query) ||
                 v.detail.toLowerCase().includes(query))
            );

            if (!vehicles.length) return;
            total += vehicles.length;

            html += `
            <section class="mb-5">
                <h3 class="mb-2">${cat === "Económico" ? "Económicos" :
                    cat === "Lujo" ? "Vehículos de lujo" : "Deportivos"}</h3>
                <p class="section-description">${vehicles.length} vehículos · Consulta disponibilidad</p>
                <div class="row g-4">
                    ${vehicles.map(v => `
                    <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                        <article class="vehicle-card">
                            <img class="vehicle-photo" loading="lazy"
                                src="https://images.unsplash.com/${v.image}?auto=format&fit=crop&w=700&q=80"
                                alt="${v.name}">
                            <div class="vehicle-info">
                                <span class="vehicle-tag">${v.category}</span>
                                <h3 class="mt-3">${v.name}</h3>
                                <p>${v.detail}</p>
                                <p>Precio: consultar</p>
                                <button class="btn btn-outline-gold w-100 select-car"
                                    data-car="${v.name}" data-category="${v.category}">
                                    Consultar alquiler
                                </button>
                            </div>
                        </article>
                    </div>`).join("")}
                </div>
            </section>`;
        });

        container.innerHTML = html || '<p class="section-description">No se encontraron vehículos.</p>';
        count.textContent = `Mostrando ${total} vehículos`;
    }

    filters.addEventListener("click", event => {
        const button = event.target.closest("[data-filter]");
        if (!button) return;

        category = button.dataset.filter;
        filters.querySelectorAll(".filter-btn").forEach(btn =>
            btn.classList.toggle("active", btn === button)
        );
        render();
    });

    search.addEventListener("input", render);

    document.addEventListener("click", event => {
        const button = event.target.closest(".select-car");
        if (!button) return;

        const type = button.dataset.category;
        document.getElementById("serviceType").value =
            type === "Económico" ? "Alquiler económico" :
            type === "Lujo" ? "Alquiler de lujo" : "Alquiler deportivo";

        document.getElementById("chosenVehicle").value = button.dataset.car;
        document.getElementById("contacto").scrollIntoView({behavior:"smooth"});
    });

    render();
});
