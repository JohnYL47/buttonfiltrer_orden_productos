// Al recargar la pag inicia la funcion
document.addEventListener("DOMContentLoaded", function() {

    // Función para obtener los productos desde la API
    function obtenerProducts() {
        return fetch('http://localhost:8000/api/productos')
            .then((res) => res.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error('Error al obtener productos:', error);
                return [];
            });
    }

    // Función para cargar los productos en la tabla
    function cargarProducts() {
        obtenerProducts()
            .then(products => {
                const tblBody = document.getElementById('tablaBody');
                
                // Limpiar la tabla antes de agregar los productos
                tblBody.innerHTML = '';

                // Llenar la tabla con los productos obtenidos
                products.forEach(producto => {
                    const row = document.createElement('tr');
                    
                    // Crear celdas para cada propiedad del producto
                    row.innerHTML = `
                        <td>${producto.nombre}</td>  <!-- Cambié 'nombre' por 'title' -->
                        <td>${producto.precio}</td>  <!-- Cambié 'precio' por 'price' -->
                        <td>${producto.stock}</td>  <!-- Asegúrate que 'stock' exista en la API, o usa un valor predeterminado -->
                    `;
                    
                    tblBody.appendChild(row);
                });
            })
            .catch((error) => {
                console.error('Error al cargar los productos:', error);  // En caso de error, lo mostramos en la consola
            });
    }

    // Función para ordenar la tabla según el precio
    function ordenarTabla(orden) {
        const tabla = document.getElementById("tablaBody");
        const filas = Array.from(tabla.rows);
        
        // Ordenar las filas por precio
        filas.sort((filaA, filaB) => {
            const precioA = parseFloat(filaA.cells[1].textContent);
            const precioB = parseFloat(filaB.cells[1].textContent);
            
            if (orden === 'ascendente') {
                return precioA - precioB;
            } else {
                return precioB - precioA;
            }
        });

        // Limpiar el cuerpo de la tabla y agregar las filas ordenadas
        filas.forEach(fila => tabla.appendChild(fila));
    }

    // Cargar los productos al cargar la página
    window.onload = cargarProducts;

    // Asocia los botones de ordenación con la función de ordenar
    document.getElementById('ascendente').addEventListener('click', function() {
        ordenarTabla('ascendente');
    });

    document.getElementById('descendente').addEventListener('click', function() {
        ordenarTabla('descendente');
    });
});