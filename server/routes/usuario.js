const express = require('express');
//pARA Encriptar en una sola linea npm i bcrypt --save
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
//Inicializar express
const app = express()
    //Obtener nuevos registros
app.get('/usuarios', function(req, res) {

    let desde = req.query.desde || 0; //query viene parametros opcionales
    desde = Number(desde);
    let limite = req.query.limite || 5; //si no me especifica el limite lo dejo 5
    limite = Number(limite);
    //Para los parametros opcionales se deja {{url}}/usuarios?limite=10&desde=0
    Usuario.find({ estado: true }, 'nombre email role estado google img') //Dentro de las llaves se colocan los filtros de como quieren buscar 
        //Despues de la coma se coloca los campos que se deseen mostrar.
        .skip(desde) //Para manejar la paginacion
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios, //retornamos el array
                    conteo
                });
            });
            //usuarioDB.password = null;

        });




});
//Crear nuevos registros
app.post('/usuarios', function(req, res) {
    let body = req.body; //para esto se ocupa body parser y por default ya obtenie datos del fe
    let usuario = new Usuario({ //trae una instanciacion del schema creado
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //10 son las vueltas o iteracion para hacer hash
        role: body.role
    }); //importamos el esquema
    //save palabra reservada de mongoose
    //Esta sera la respuesta que quedara almacenada en mongoose usuarioDB
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    /*   if (body.nombre === undefined) {
          res.status(400).json({
              ok: false,
              mensaje: 'El nombre es necesario'
          }); //retornar codigo de error
      } else {
          res.json({
              persona: body
          });
      } */
});
//Actualizar registros aunq tambien se puede crear registros
app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id; //obtener el id
    let body = _.pick(req.body, ['nombre',
        'email',
        'img',
        'role',
        'estado'
    ]); //como segundo argumento semanda las cosas que sideseo actualizar con ayuda del underscore

    //new es una opcion del metodo
    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

//npm i underscore --save para eliminar ciertas propiedades que no se desea enviar al usuario o actualizar X documento

app.delete('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    };
    //Borrar el registro fisicamente
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        };
        /*
        Sucedio un caso extraño se busco con una longitud distinta del id del mongodb
        y da un error cast disnto, pero cuando busco de nuevo pero con el id exacto que borre
        si retorna el error personalizado al parecer buscar en un segundo plano el registro que borre
        es decir q lo busca talvez en cache o en algun otro lugar
        {{url}}/usuarios/5b28e7ceea4f4718e3c4a176

        Con el caso mencionado se puede incurrir validaciones para incluirvalidacion de objectid de mongodb
        */
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;

//mLab es un repositorio en la nube para almacenar info arriba
//mLab ocupe la misma pwd de udemy y correo gmail. por default da 500 mg
//luego crea new-> amazon->sanbox para despliegue de 500mg