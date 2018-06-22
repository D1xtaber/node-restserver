require('./config/config')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    //Estos son middelware q pasa peticion se dispara
    // parse application/json
app.use(bodyParser.json())


app.use(require('./routes/usuario'))
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Basae de datos Online!');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000')
});
//npm install body-parser --save
//npm i express --save
//En postman se selecciona body y x-www-form-ulencoded y se setea para metros dummy
//npm i mongoose --save