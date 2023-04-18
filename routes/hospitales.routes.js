// ruta: '/api/hospitales

const {Router} = require('express');
const { check } = require('express-validator');
const {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
} = require('../controllers/hospitales.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Rutas
router.get( '/', getHospitales)

router.post( '/', 
     [ 
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], crearHospitales)

router.put( '/:id',[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
 ],     
 actualizarHospitales,
)

router.delete( '/:id', validarJWT, borrarHospitales)

module.exports = router;