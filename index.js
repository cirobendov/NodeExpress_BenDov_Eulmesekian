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
        res.status(400).send('La fecha no es válida')
    }
})


//
// - - - B - - -
//
app.get('/matematica/sumar', (req, res) =>{
    const n1 = parseFloat(req.query.n1)
    const n2 = parseFloat(req.query.n2)
    res.status(200).send(sumar(n1, n2).toString())
})
app.get('/matematica/restar', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    res.status(200).send(restar(n1, n2).toString());
});
app.get('/matematica/multiplicar', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    res.status(200).send(multiplicar(n1, n2).toString());
});
app.get('/matematica/dividir', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (n2 === 0) {
        res.status(400).send("El divisor no puede ser cero");
    } else {
        res.status(200).send(dividir(n1, n2).toString());
    }
});

app.get('/omdb/searchbypage', async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.p || '1');
    const resultado = await OMDBSearchByPage(search, page);
    res.status(200).json(resultado);
});

app.get('/omdb/searchcomplete', async (req, res) => {
    const search = req.query.search || '';
    const resultado = await OMDBSearchComplete(search);
    res.status(200).json(resultado);
});

app.get('/omdb/getbyomdbid', async (req, res) => {
    const imdbID = req.query.imdbID || '';
    const resultado = await OMDBGetByImdbID(imdbID);
    res.status(200).json(resultado);
});

const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido"  , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao"    , "32623391", 18));
app.get('/alumnos', (req, res) => {
    res.status(200).json(alumnosArray);
});
app.get('/alumnos/:dni', (req, res) => {
    const alumno = alumnosArray.find(a => a.dni === req.params.dni);
    if (!alumno) return res.status(404).send("Alumno no encontrado");
    res.status(200).json(alumno);
});
app.post('/alumnos', (req, res) => {
    const { username, dni, edad } = req.body;
    alumnosArray.push(new Alumno(username, dni, edad));
    res.status(201).send("Alumno agregado");
});
app.delete('/alumnos', (req, res) => {
    const dni = req.body.dni;
    const index = alumnosArray.findIndex(a => a.dni === dni);
    if (index === -1) return res.status(404).send("Alumno no encontrado");
    alumnosArray.splice(index, 1);
    res.status(200).send("Alumno eliminado");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})