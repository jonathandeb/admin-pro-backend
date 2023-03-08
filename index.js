require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config.js');

const app = express();

//Configurar cors
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//Base de Datos
dbConnection();

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios.routes') )
app.use( '/api/login', require('./routes/auth.routes') )

//console.log(process.env)

//mean_user
//jUwZ6RDZYnJTpQ4m




app.listen( process.env.PORT, ()=>{
    console.log('servidor corriendo' + process.env.PORT)
} )