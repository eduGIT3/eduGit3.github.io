document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Animación de Scroll (Intersection Observer) ---
    // Selecciona todos los elementos que queremos animar
    const hiddenElements = document.querySelectorAll('.hidden-scroll');

    // Configura el observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Si el elemento está en pantalla, añade la clase 'show-scroll'
                entry.target.classList.add('show-scroll');
            }
            // Opcional: para que la animación se repita cada vez que entran
            // else {
            //     entry.target.classList.remove('show-scroll');
            // }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });

    // Observa cada elemento
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 2. Lógica del Formulario de Contacto ---
    const contactoForm = document.getElementById('contacto-form');
    const contactMessage = document.getElementById('contact-form-message');

    if (contactoForm) {
        contactoForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // Simulación de envío
            contactMessage.textContent = 'Gracias por tu mensaje. Te responderemos pronto.';
            contactMessage.className = 'form-status-message success'; // Aplica clase de éxito

            // Limpia el formulario después de 2 segundos
            setTimeout(() => {
                contactoForm.reset();
                contactMessage.textContent = '';
                contactMessage.className = 'form-status-message';
            }, 3000);
        });
    }

    // --- 3. Lógica del Formulario de Satisfacción (Estrellas) ---
    const satisfaccionForm = document.getElementById('satisfaccion-form');
    const satisfaccionMessage = document.getElementById('form-message');
    const stars = document.querySelectorAll('.stars .fa-star');
    const ratingInput = document.getElementById('valoracion');

    // Función para actualizar las estrellas
    function updateStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            if (starRating <= rating) {
                star.classList.add('fas', 'filled'); // 'fas' es solid
                star.classList.remove('far'); // 'far' es regular
            } else {
                star.classList.add('far');
                star.classList.remove('fas', 'filled');
            }
        });
    }

    // Event listeners para las estrellas
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.dataset.rating;
            ratingInput.value = rating; // Actualiza el valor del input oculto
            updateStars(rating);
        });

        star.addEventListener('mouseover', () => {
            // Muestra el hover solo hasta la estrella sobre la que pasas el ratón
            const rating = star.dataset.rating;
            stars.forEach(s => {
                s.classList.toggle('hover', s.dataset.rating <= rating);
            });
        });

        star.addEventListener('mouseout', () => {
            // Al quitar el ratón, quita el efecto hover
            stars.forEach(s => s.classList.remove('hover'));
            // Y restaura la selección actual (basada en el input)
            updateStars(ratingInput.value);
        });
    });

    // Manejador del envío del formulario de satisfacción
    if (satisfaccionForm) {
        satisfaccionForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (ratingInput.value === "0") {
                satisfaccionMessage.textContent = 'Por favor, selecciona una valoración (1-5 estrellas).';
                satisfaccionMessage.className = 'form-status-message error';
                return; // No envía si no se ha valorado
            }

            // Simulación de envío
            satisfaccionMessage.textContent = '¡Gracias por tu opinión!';
            satisfaccionMessage.className = 'form-status-message success';

            // Resetea el formulario y las estrellas
            setTimeout(() => {
                satisfaccionForm.reset();
                ratingInput.value = "0";
                updateStars(0);
                satisfaccionMessage.textContent = '';
                satisfaccionMessage.className = 'form-status-message';
            }, 3000);
        });
    }
});