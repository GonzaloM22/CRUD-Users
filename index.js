const express = require('express');
const app = express();
const router = require('./routes/router.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', router);

const port = 5001;
app.listen(port, () =>
  console.log(`Servidor funcionando en el puerto ${port}`)
);
