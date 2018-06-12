require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    //Estos son middelware q pasa peticion se dispara
    // parse application/json
app.use(bodyParser.json())

//Obtener nuevos registros
app.get('/usuarios', function(req, res) {
    res.json('get Usuarios');
});
//Crear nuevos registros
app.post('/usuarios', function(req, res) {
    let body = req.body; //para esto se ocupa body parser y por default ya obtenie datos del fe
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        }); //retornar codigo de error
    } else {
        res.json({
            persona: body
        });
    }
});
//Actualizar registros aunq tambien se puede crear registros
app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id; //obtener el id
    res.json({
        id
    });
});

app.delete('/usuarios', function(req, res) {
    res.json('delete Usuarios');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000')
});
//npm install body-parser --save
//npm i express --save
//En postman se selecciona body y x-www-form-ulencoded y se setea para metros dummy