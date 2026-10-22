
document.addEventListener("DOMContentLoaded", () => {
    // Año automático en el pie de página.
    document.getElementById("year").textContent = new Date().getFullYear();

    // Cierra el menú móvil después de elegir una sección.
    document.querySelectorAll(".navbar .nav-link").forEach(link => {
        link.addEventListener("click", () => {
            const menu = document.getElementById("menu");

            if (menu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });
});
