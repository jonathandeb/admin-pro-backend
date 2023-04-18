const { response } = require("express");
const Medico = require('../models/medicos.model')

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
                          .populate('usuario', 'nombre img')
                          .populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    })

}

const crearMedicos = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico ({
        usuario: uid,
        ...req.body,
    })

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Contacte al admin'
        })
    }


}

const actualizarMedicos = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id)
        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })    
        }
        const cambiosMedico = {     
            ...req.body,
            usuario: uid
        }

        const actualizarMedico = await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true})
        
        res.json({
            ok: true,
            msg: 'Medico Actualizado',
            actualizarMedico
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Contacte al admin'
        })
    }


}

const borrarMedicos = async (req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })    
        }

        await Medico.findByIdAndDelete(id)
        
        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Contacte al admin'
        })
    }

}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}