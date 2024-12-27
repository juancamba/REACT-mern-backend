const express = require('express');

//crear servidor expres
const app = express();

// Rutas
app.get("/",(req, res)=>{
    res.json({
        ok: true

    })
})


//escuchar
app.listen(4000, ()=>{
    console.log(`Servidor corriendo en ${4000}`);
})