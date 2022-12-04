const { response } = require("express")



const esAdminRole = (req, res = response, next) => {
    //req intuyoque es un objeto que se le puede añadir informacion y pasr ingo de igual forma 
    console.log("I have a time ");

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se tiene que verificar el role sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();

}

//no coloques todos los archomentos 1,2,3,4 -> usa el resto (convierte en un arreglo lo que se envie ) de operadores o sprred 
 //! si se le envia parametros por defecto muy ajenos a expresss
    const tieneRole = ( ...roles  ) => {
        return (req, res = response, next) => {
            
            if ( !req.usuario ) {
                return res.status(500).json({
                    msg: 'Se quiere verificar el role sin validar el token primero'
                });
            }
    
            if ( !roles.includes( req.usuario.rol ) ) {
                return res.status(401).json({
                    msg: `El servicio requiere uno de estos roles ${ roles }`
                });
            }
    
    
            next();
        }
    }
    


module.exports = {
    esAdminRole,
    tieneRole
}