
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    function applyTheme(theme) {
        document.body.classList.toggle("dark", theme === "dark");
        icon.className = theme === "dark"
            ? "bi bi-sun-fill"
            : "bi bi-moon-stars-fill";

        try {
            localStorage.setItem("veltreon-theme", theme);
        } catch (error) {
            // La página sigue funcionando si el almacenamiento está bloqueado.
        }
    }

    let savedTheme = "light";
    try {
        savedTheme = localStorage.getItem("veltreon-theme") || "light";
    } catch (error) {}

    applyTheme(savedTheme);

    button.addEventListener("click", () => {
        applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
    });
});
