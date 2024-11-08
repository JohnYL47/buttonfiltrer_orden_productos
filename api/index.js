const productosDB = require('../productsDB.json');
const express = require('express');
const path = require('path');

const products = productosDB.productos;
const app = express();

app.use(express.json);

// localhost
app.get('/', (req, res) => {
    res.send('Wellcome!!');
})

// Muestra todos los productos
app.get('/api/productos', (req, res) => {
    res.send(products);
})

// Muestra un producto según el id
app.get('/api/productos/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado.');
    else res.send(product);
})

// Crear un nuevo producto
app.post('/api/productos', (req, res) => {
    const hora = new Date();
    const product = {
        id: products.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
        fecha_agregado: `${hora.getFullYear()}-${hora.getMonth() + 1}-${hora.getDate()}`
    }
    products.push(product);
    res.status(201).send(product);
})

// Actualizar completamente un producto por su id
app.put('/api/productos/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado.');
    
    // Actualizar los campos del producto
    product.nombre = req.body.nombre || product.nombre;
    product.precio = req.body.precio || product.precio;
    product.stock = req.body.stock || product.stock;
    product.fecha_agregado = req.body.fecha_agregado || product.fecha_agregado;

    res.send(product);
})

// Actualizar parcialmente un producto por su id
app.patch('/api/productos/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado.');
    
    // Solo actualizamos los campos que se proporcionan en el cuerpo de la solicitud
    if (req.body.nombre) product.nombre = req.body.nombre;
    if (req.body.precio) product.precio = req.body.precio;
    if (req.body.stock) product.stock = req.body.stock;
    if (req.body.fecha_agregado) product.fecha_agregado = req.body.fecha_agregado;

    res.send(product);
})

// Eliminar un producto por su id
app.delete('/api/productos/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado.');
    
    // Encontramos el índice del producto y lo eliminamos
    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send(product);
})

const PORT = process.env.PORT || 8000;

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Listening - http://localhost:${PORT}`);
});
