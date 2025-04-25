import express  from "express"; // hacer npm i express
import cors     from "cors";    // hacer npm i cors

import Alumno from './models/alumno.js';
import {PI, sumar, restar, multiplicar, dividir, numeros} from './modules/matematica.js'
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"

const app  = express();
const port = 3000;              // El puerto 3000 (http://localhost:3000)

// Agrego los Middlewares
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON



app.get('/', (req, res) => {                // EndPoint "/"
    res.status(200).send('Ya estoy respondiendo!');
})
app.get('/saludar/:nombre', (req, res) => {             // EndPoint "/saludar"
    res.send('Hola ' + req.params.nombre);
})

//a3)
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    const ano = parseInt(req.params.ano)
    const mes = parseInt(req.params.mes - 1)
    const dia = parseInt(req.params.dia)

    let fecha = new Date(ano, mes, dia)
    if (fecha.getFullYear() === ano && fecha.getMonth() === mes && fecha.getDate() === dia) {
        res.status(200).send('La fecha es válida')
    }else{
        res.status(400).send('Esta como el orto la fecha')
    }
})


//
// - - - B - - -
//
app.get('/matematica/sumar', (req, res) =>{
    const n1 = parseFloat(req.query.n1)
    const n2 = parseFloat(req.query.n2)
    res.status(200).send(n1 + n2)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})