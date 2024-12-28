const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')
//console.log(process.env)
//crear servidor expres
const app = express();

// base de datos

dbConnection();

app.use(cors());

// lectura y parseo del body (payload)
app.use( express.json())

// Rutas
app.use('/api/auth', require("./routes/auth") );

// directorio public
app.use( express.static('public'));



//escuchar
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en ${process.env.PORT}`);
})