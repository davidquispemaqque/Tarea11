require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const app = express();

// Conectar a MongoDB sin las opciones obsoletas
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected!'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Configuración del motor de vistas
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', usersRouter);

// Redirección a /users
app.get('/', (req, res) => {
  res.redirect('/users');
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
