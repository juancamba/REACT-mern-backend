const {response} = require('express');
const jwt = require('jsonwebtoken')


const validarJwt = (req, res = response, next) =>{
    //x-token header
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "no hay token en cabecera "
        })
    }


    try {

        const payload =jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid;
        req.name  = payload.name;


        console.log(payload);
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token inválido"
        })
    }
    console.log(token)
    next();
}

module.exports ={
    validarJwt
}