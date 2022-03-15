const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');

const { nuevoCurso, prepararCurso, editarCurso, eliminarCurso } = require('./consulta');

app.use (bodyParser.urlencoded({ extended: false }));
app.use (bodyParser.json());

app.listen (3000, () => console.log('Server ON.'));

app.get ('/', (req, res) => {
    res.sendFile (__dirname + '/index.html');
});

app.post ('/curso', async (req, res) => {
    const { nombre, nivel ,fecha ,duracion } = req.body;
    const respuesta = await nuevoCurso(nombre, nivel, fecha, duracion);
    res.send(respuesta);
});

app.get ('/cursos', async (req, res) => {
    const respuesta = await prepararCurso();
    res.send(respuesta);
});

app.put ('/curso/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, nivel, fecha, duracion } = req.body
    const respuesta = await editarCurso(id, nombre, nivel, fecha, duracion);
    res.send(respuesta);
});

app.delete ('/curso/:id', async (req, res) => {
    const { id } = req.params;
    const respuesta = await eliminarCurso(id);

    respuesta > 0
        ? res.send (`Curso id ${id} ELIMINADO`)
        : res.send ('Curso no existe');
});