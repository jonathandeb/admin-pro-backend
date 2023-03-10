// api/todo/:busquedas\

const {Router} = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas.controller');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Rutas
router.get('/:busqueda', validarJWT, getTodo)
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion)


module.exports = router;