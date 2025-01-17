document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const ipOverlay = document.getElementById("ip-overlay");
    const iframe = document.getElementById("ip-frame");

    let userIP = "";

    // Obtener la IP del usuario
    const fetchIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        userIP = data.ip;
        iframe.src = `https://ipinfo.io/${userIP}`;
        generateIPOverlay(userIP);
    };

    // Mostrar pasos
    const showStep = (index) => {
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });
    };

    // Generar superposición de IP
    const generateIPOverlay = (ip) => {
        const repeatedIP = Array(50).fill(ip).join(" ");
        ipOverlay.textContent = repeatedIP;
    };

    // Bloquear pantalla completa del video
    const blockFullscreen = () => {
        const video = document.getElementById("video-player");
        video.addEventListener("webkitfullscreenchange", (e) => e.preventDefault());
        video.addEventListener("fullscreenchange", (e) => e.preventDefault());
        video.removeAttribute("allowfullscreen");
    };

    // Añadir animación del tick al login
    const showTickAnimation = () => {
        showStep(2); // Mostrar el contenedor de la animación
        setTimeout(() => {
            showStep(3); // Continuar al siguiente paso (IP y video)
        }, 1000);
    };

    // Validar correo y contraseña
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!email.endsWith("@ibf.cat") && !email.endsWith("@bernatelferrer.cat")) {
            alert("Dominio de correo no válido.");
            return;
        }
        if (password !== "1234") {
            alert("Contraseña incorrecta.");
            return;
        }

        // Mostrar animación del tick después de login exitoso
        showTickAnimation();
        fetchIP(); // Obtener y cargar la IP
    });

    // Confirmar IP y continuar
    document.getElementById("ip-confirm-btn").addEventListener("click", () => {
        showStep(4);
    });

    // Bloquear pantalla completa en reproductor de video
    blockFullscreen();
});
