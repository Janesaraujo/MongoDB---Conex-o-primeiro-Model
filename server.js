require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://janesaraujo:2Z7zkUZLqh2x0LOS@cluster01.zurss.mongodb.net/BANCODEDADOS?retryWrites=true&w=majority&appName=Cluster01';

mongoose.connect(connectionString)
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => console.log('Erro ao conectar ao MongoDB:', e));

const routes = require('./routes');
const path = require('path');
const { middlewareGlobal } = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
