const {response} = require('express');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const Usuario = require('../models/Usuario')
const { generarJwt } = require('../helpers/jwt')

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

        //encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();
        // generar jwt

        const token = await generarJwt(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name,
            token
          
    
    
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al guardar en bd"
        })
    }

}

const loginUsuario = async (req, res= response)=>{
    
    const {email, password} = req.body;

    try {
        
        let usuarioEnBd = await Usuario.findOne({email});
        
        if(!usuarioEnBd ){
            return res.status(400).json({
                ok: false,
                msg: `el usuario no existe con ese email`
            })
        }

        // confirmar password

        const validPassword = bcrypt.compareSync(password, usuarioEnBd.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: `Password incorrecto`
            })
        }
        
        // generar jwt
        const token = await generarJwt(usuarioEnBd.id, usuarioEnBd.name);
        
        res.json({
            ok: true,
            msg: 'logged',
            uid: usuarioEnBd.id,
            name: usuarioEnBd.name,
            token
    
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
        
    }
    
    
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