const fs = require('fs');

const Medico = require("../models/medicos.model")
const Usuario = require("../models/usuarios.model")
const Hospital = require("../models/hospital.models")

const actualizarImagen = async ( tipo, id, nombreArchivo )=>{
    let elemento = [];
    
    switch (tipo) {
        case 'medicos':
            elemento = await Medico.findById(id)
            break;
        case 'usuarios':
            elemento = await Usuario.findById(id)         
            break;
        case 'hospitales':
            elemento = await Hospital.findById(id)
            break;    
        default:
            break;
    }
    
    if( !elemento ){ 
        console.log(`id no es un ${tipo}`); 
        return false; 
    }
    const pathViejo=`./uploads/${tipo}/${elemento.img}` 

    if(fs.existsSync( pathViejo ) ){
        fs.unlinkSync( pathViejo )
    }       

    elemento.img = nombreArchivo;
    await elemento.save();
    return true
    

}
module.exports={
    actualizarImagen
}