var User = require('../models/users');



exports.lista_usuarios = function (req, res, next) {
    console.log("entro a controller lista usuarios");

    User.find({}, function (err, usuarios) {
        if (err) return handleError(err);
        //res.json(usuario.sort());

        res.render('registros', { usuario:usuarios});

    });


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

