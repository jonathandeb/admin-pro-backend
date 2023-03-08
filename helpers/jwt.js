

const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {
        var jwt = require('jsonwebtoken');
        
        const payload = {
            uid,
        };

        var token = jwt.sign( payload, process.env.JWT_SECRET, { 
            expiresIn: '12h'
         });
        resolve(token)   

        

    })

}

module.exports = {
    generarJWT,
}