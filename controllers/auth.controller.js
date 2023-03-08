const { response } = require("express");
var bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios.model');
const { generarJWT } = require("../helpers/jwt");

const login = async ( req, res = response) =>{

    const { email, password } = req.body;

    try {

        //Poner un delay de 1 segundo para los bombardeos al login

        //Verificar email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        //Verificar contrasena
        const validPassword = bcrypt.compareSync( password, usuarioDB.password)

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contrasena no valida'
            })
        }

        //Generar el TOKEN
        const token = await generarJWT(usuarioDB._id)


        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}