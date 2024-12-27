const {response} = require('express');
const { validationResult } = require('express-validator')

const crearUsuario = (req, res=  response)=>{
    
    const {name, email, password} = req.body;
    
    
    // errorees en middleware
    
    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password


    });

}

const loginUsuario = (req, res= response)=>{
    
    const {name, password} = req.body;

    // errorees en middleware
    
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