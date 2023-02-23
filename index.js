require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config.js');

const app = express();

//Configurar cors
app.use(cors());

//Base de Datos
dbConnection();

//console.log(process.env)

//mean_user
//jUwZ6RDZYnJTpQ4m

//Rutas
app.get( '/', ( req, res ) => {
    res.json(
        {
            ok: true,
            msg: 'Hola Mundo',
        }
    )
} )


app.listen( process.env.PORT, ()=>{
    console.log('servidor corriendo' + process.env.PORT)
} )