const {response} = require('express');


const crearUsuario = (req, res=  response)=>{
    
    const {name, email, password} = req.body;
    
    res.json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password


    });

}

const loginUsuario = (req, res= response)=>{
    
    const {name, password} = req.body;
    
    res.json({
        ok: true,
        msg: 'login',
        name,
        
        password

    })
}

const revalidarToken = (req, res)=>{
    res.json({
        ok: true,
        msg: 'renew'
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}