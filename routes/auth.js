const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router();

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth')

router.post("/new",
     [
        check('name','el nombre es obligatorio').not().isEmpty(),
        check('email','el nombre es obligatorio').isEmail(),
        check('password','Password debe tener mas de 6 caracteres').isLength({min:6}) ,
        validarCampos
     ]
    ,crearUsuario);

router.post("/", 
    [
        check('email','el nombre es obligatorio').isEmail(),
        
        check('password','Password debe tener mas de 6 caracteres').isLength({min:6}) ,
        validarCampos
    ],
    
    loginUsuario)

router.get("/renew", revalidarToken)



module.exports = router;