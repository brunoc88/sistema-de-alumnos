// Esperamos a que el contenido del DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  
    // Seleccionamos el elemento de notificación mediante su id (en este caso, el elemento con id 'notification')
    const notification = document.querySelector("#notification");
  
    // Verificamos si el elemento de notificación existe en el DOM
    if (notification) {
  
      // Iniciamos un temporizador para que después de 1.5 segundos (1500 milisegundos) empiece a desvanecerse
      setTimeout(() => {
  
        // Establecemos la propiedad CSS de transición para que la opacidad cambie suavemente en 0.5 segundos
        notification.style.transition = "opacity 0.5s ease";
  
        // Establecemos la opacidad del elemento a 0, lo que hace que se desvanezca
        notification.style.opacity = "0";
  
        // Después de 0.5 segundos (el tiempo de duración de la transición), eliminamos el elemento del DOM
        setTimeout(() => notification.remove(), 500); // 500 milisegundos es el tiempo que tarda la transición de opacidad
      }, 5000); // es el tiempo que esperamos antes de iniciar el desvanecimiento
    }
  });