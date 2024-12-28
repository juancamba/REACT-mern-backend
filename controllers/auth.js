const {response} = require('express');
const { validationResult } = require('express-validator')

const Usuario = require('../models/Usuario')

const crearUsuario = async (req, res=  response)=>{
    
    const {name, email, password} = req.body;
    
 

    try {
        
        let usuarioEnBd = await Usuario.findOne({email});
        
        if(usuarioEnBd ){
            return res.status(400).json({
                ok: false,
                msg: `ya existe un usuario con el email ${email}`
            })
        }

        const usuario = new Usuario(req.body);

        await usuario.save();
        // errorees en middleware
        
        res.status(201).json({
            ok: true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name,

          
    
    
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al guardar en bd"
        })
    }

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