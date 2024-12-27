const express = require('express');
require('dotenv').config();

console.log(process.env)
//crear servidor expres
const app = express();

// Rutas
/*
app.get("/",(req, res)=>{
    res.json({
        ok: true

    })
})
*/

// directorio public
app.use( express.static('public'));

//escuchar
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en ${process.env.PORT}`);
})