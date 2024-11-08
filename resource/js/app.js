document.addEventListener("DOMContentLoaded", function() {
    const divContainer = document.getElementById('tablaBody');  // Contenedor de la tabla

    // Función para obtener los productos desde la API
    function obtenerProducts() {
        return fetch('http://localhost:8000/api/productos')  // Cambié la URL al puerto correcto
            .then((res) => res.json())  // Convertimos la respuesta en JSON
            .then((data) => {
                return data;  // Retornamos los productos
            })
            .catch((error) => {
                console.error('Error al obtener productos:', error);  // En caso de error, lo mostramos en la consola
                return [];  // Retornamos un array vacío si ocurre un error
            });
    }

    // Función para cargar los productos en la tabla
    function cargarProducts() {
        obtenerProducts()
            .then(products => {
                const tblBody = document.getElementById('tablaBody');  // Contenedor donde se agregan las filas
                
                // Limpiar la tabla antes de agregar los productos
                tblBody.innerHTML = '';

                // Llenamos la tabla con los productos obtenidos
                products.forEach(producto => {
                    const row = document.createElement('tr');  // Creamos una nueva fila <tr>
                    
                    // Crear celdas para cada propiedad del producto
                    row.innerHTML = `
                        <td>${producto.title}</td>  <!-- Cambié 'nombre' por 'title' -->
                        <td>${producto.price}</td>  <!-- Cambié 'precio' por 'price' -->
                        <td>${producto.stock}</td>  <!-- Asegúrate que 'stock' exista en la API, o usa un valor predeterminado -->
                    `;
                    
                    tblBody.appendChild(row);  // Agregamos la fila a la tabla
                });
            })
            .catch((error) => {
                console.error('Error al cargar los productos:', error);  // En caso de error, lo mostramos en la consola
            });
    }

    // Función para ordenar la tabla según el precio
    function ordenarTabla(orden) {
        const tabla = document.getElementById("tablaBody");
        const filas = Array.from(tabla.rows);  // Convertimos las filas en un array para poder manipularlas
        
        // Ordenar las filas por precio
        filas.sort((filaA, filaB) => {
            const precioA = parseFloat(filaA.cells[1].textContent); // Tomamos el precio de la fila A
            const precioB = parseFloat(filaB.cells[1].textContent); // Tomamos el precio de la fila B
            
            if (orden === 'ascendente') {
                return precioA - precioB;  // Ascendente: menor a mayor
            } else {
                return precioB - precioA;  // Descendente: mayor a menor
            }
        });

        // Limpiar el cuerpo de la tabla y agregar las filas ordenadas
        filas.forEach(fila => tabla.appendChild(fila));  // Re-ordenamos las filas en la tabla
    }

    // Cargar los productos al cargar la página
    window.onload = cargarProducts;

    // Asocia los botones de ordenación con la función de ordenar
    document.getElementById('ascendente').addEventListener('click', function() {
        ordenarTabla('ascendente');  // Orden ascendente por precio
    });

    document.getElementById('descendente').addEventListener('click', function() {
        ordenarTabla('descendente');  // Orden descendente por precio
    });
});
