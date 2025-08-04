// index.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ruta de autenticación
const userRoutes = require('./routes/userRoutes'); // Ruta de usuarios
const pedidoRoutes = require('./routes/pedidoRoutes'); // Ruta de pedidos
const direccionRoutes = require('./routes/direccionRoutes');
const app = express();

app.use(cors());
app.use(express.json()); // Para poder recibir datos en formato JSON

app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/users', userRoutes); // Rutas de usuarios
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/direcciones', direccionRoutes);

app.listen(5000,'0.0.0.0', () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
