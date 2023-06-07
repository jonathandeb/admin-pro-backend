// ruta: '/api/Medicos'

const {Router} = require('express');
const { check } = require('express-validator');
const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
    getMedicoById
} = require('../controllers/medicos.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Rutas
router.get( '/', validarJWT, getMedicos)

router.post( '/', [
    validarJWT,
    check('nombre', "El nombre del medico es obligatorio").not().isEmpty(),
    check('hospital', "El hospital ID debe ser valido").isMongoId(),
    validarCampos
 ], crearMedicos)

router.put( '/:id',[
    validarJWT,
    check('nombre', "El nombre del medico es obligatorio").not().isEmpty(),
    check('hospital', "El hospital ID debe ser valido").isMongoId(),
    validarCampos
 ], actualizarMedicos,
)

router.delete( '/:id',[
    validarJWT
 ], borrarMedicos)

router.get( '/:id',[
    validarJWT
 ], getMedicoById)

module.exports = router;