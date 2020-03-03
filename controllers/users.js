var User = require('../models/users');

exports.lista_usuarios = function (req, res, next) {
    console.log("entro a controller lista usuarios");

    User.find({}, function (err, usuarios) {
        if (err) return handleError(err);
        //res.json(usuario.sort());

        usuarios = usuarios.sort();
        usuarios = reemplazar_nombres(usuarios);

        res.render('registros', { usuarios:usuarios});
    });

}

function reemplazar_nombres(arreglo) {

    arreglo.map(function (arreglo) {

        if (arreglo.name.includes('\u00f1')) {
            let nombre = arreglo.name;
            arreglo.name = nombre.replace(new RegExp("\u00f1", 'gi'), "n");//todas las enies
        }
        if (arreglo.lastname.includes('\u00f1')) {
            let apellido = arreglo.lastname;
            arreglo.lastname = apellido.replace(new RegExp("\u00f1", 'gi'), "n");//todas las enies
        }
    });
    
    return arreglo;
    
}


exports.user_create = function (req, res, next) {
    console.log("entro a controller");
    if (req.body) {
        console.log("dato valido");
        let items = req.body;
        User.create(items, function (err, newUsers) {
            console.log("comenzamos a crear usuario");
            if (err) return res.json({ error: err });
            console.log("llego al final");

            var usuario = newUsers;
            //res.json(newUsers);
            res.render('resOk', { nombreUsuario: usuario.name });

        });
    } else {
        res.json({
            status: 'ERROR', message: 'Debe completar todos los campos'}); //opcional mandar un mensaje de error
    }
}

