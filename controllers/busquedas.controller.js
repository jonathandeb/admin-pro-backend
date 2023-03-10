const { response } = require("express");
const hospitalModels = require("../models/hospital.models");
const medicosModel = require("../models/medicos.model");
const usuariosModel = require("../models/usuarios.model");

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp ( busqueda, 'i' )

    const [usuarios, hospitales, medicos] = await Promise.all([
        usuariosModel.find({ nombre : regex }),
        hospitalModels.find({ nombre : regex }),
        medicosModel.find({ nombre : regex })
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })

}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp ( busqueda, 'i' )

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await medicosModel.find({ nombre: regex })
                                        .populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre img')
            break;
        case 'hospitales':
            data = await hospitalModels.find({ nombre: regex })
                                        .populate('usuario', 'nombre img')

            
            break;
        case 'usuarios':
            data = await usuariosModel.find({ nombre: regex })
            
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            })
            break;
    }


    res.json({
        ok: true,
        resultados: data
    })

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}