
const { response } = require('express');
var bcrypt = require('bcryptjs');


const Usuario = require('../models/usuarios.model');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async( req, res ) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img' )
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()
    ])

    // const usuarios = await Usuario
    //                                 .find({}, 'nombre email role google' )
    //                                 .skip( desde )
    //                                 .limit( 5 )

    // const total = await Usuario.count();

    res.json(
        {
            ok: true,
            usuarios,
            total
            
        }
    )
}




const crearUsuario = async( req, res = response ) => {

    const { email, password, nombre } = req.body;



    const usuario = new Usuario( req.body );

    
    try {

        const existeEmail = await Usuario.findOne({ email: email })

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado',
            })
        }

        //Encriptar contrasena
        var salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync( password, salt );

        //Guardar usuario
        const token = await generarJWT(usuario._id)
        usuario.token = token;
        await usuario.save();


        res.json(
            {
                ok: true,
                usuario,
                token
            }
        )
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado revisar log'
        })
    }
} 
 
const actualizarUsuario = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            }); 
        }
        
        //Actualizaciones
        const { password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: ' Ya existe un usuario con ese email'
                })
            }
        }
        if(!usuarioDB.google){
            campos.email = email
        }
        else if( usuarioDB.email !== email ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            })
        }
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } )

        res.json({
            ok: true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async( req, res = response ) =>{

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            }); 
        }
        else{
            await Usuario.findByIdAndDelete(uid)
            return res.status(200).json({
                ok: false,
                msg: 'Usuario Eliminado'
            }); 

        }

        // await Usuario.findByIdAndDelete(uid, function (err, docs) {
        //     if (err){
        //         console.log(error);
        //         res.status(500).json({
        //             ok:false,
        //             msg: 'Error inesperado'
        //         })
        //     }
        //     else{
        //         return res.status(200).json({
        //             ok: false,
        //             msg: 'Se ha eliminado el usuario'
        //         }); 
        //     }
        // });       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el admin'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}