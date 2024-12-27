const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth')

router.post("/new",
     [
        check('name','el nombre es obligatorio').not().isEmpty(),
        check('email','el nombre es obligatorio').isEmail(),
        check('password','Password debe tener mas de 6 caracteres').isLength({min:6}) ,
     ]
    ,crearUsuario);

router.post("/", 
    [
        check('name','el nombre es obligatorio').not().isEmpty(),
        
        check('password','Password debe tener mas de 6 caracteres').isLength({min:6}) ,
    ],
    
    loginUsuario)

router.get("/renew", revalidarToken)



module.exports = router;