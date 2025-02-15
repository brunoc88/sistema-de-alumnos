document.addEventListener('DOMContentLoaded', function () {
    // Inicializar DataTable con el id 'myTable'
    let table = new DataTable('#myTable', {
      paging: true, // Habilita la paginación
      searching: true, // Habilita la barra de búsqueda
      ordering: true, // Permite ordenar las columnas
      info: true, // Muestra la información de la tabla
      language: {
        search: "Buscar:", // Personaliza el texto del campo de búsqueda
        paginate: {
          previous: "Anterior",
          next: "Siguiente"
        },
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        zeroRecords: "No encontrado" // Cambia el mensaje cuando no se encuentran registros
      }
    });
  });
  