const {Router} = require('express');
const { check } = require('express-validator');
const { isDate} = require('../helpers/isDate')
const {validarJwt} = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router();

/*
Event routes
/api/events
*/


const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events')

router.use(validarJwt)

router.get('/',  getEventos);

router.post('/', [
    check('title','el title es obligatorio').not().isEmpty(),
    check('start','fecha inicio es obligatorio').custom(isDate),
    check('end','fecha end es obligatorio').custom(isDate),
    
    validarCampos
],  crearEvento);

router.put('/:id',   actualizarEvento);

router.delete('/:id',   eliminarEvento);



module.exports = router;