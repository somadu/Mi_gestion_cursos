const {Pool} = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "cursos",
  port: 5432
});

async function nuevoCurso (nombre, nivel, fecha, duracion) {
    try {
        const result = await pool.query(
            `INSERT INTO cursos (nombre, nivel, fecha, duracion)
            VALUES ('${nombre}','${nivel}','${fecha}','${duracion}')
            RETURNING *`
        );
        console.log(result)
        return result.rows;
            
    } catch (e) {
        console.log(e);
    }
};

async function prepararCurso() {
    try{
        const result = await pool.query(`SELECT * FROM cursos`);
        return result.rows;

    } catch (e) {
        console.log(e);
    }
};

async function editarCurso (id, nombre, nivel, fecha, duracion){
    try{
        const result = await pool.query(`
            UPDATE cursos SET
            nombre = '${nombre}',
            nivel = '${nivel}',
            fecha = '${fecha}',
            duracion = '${duracion}'
            WHERE id = '${id}'
            RETURNING *
        `);
        return result.rows;

    } catch (e) {
        console.log(e);
    }
};

async function eliminarCurso (id) {
    try {
        const result = await pool.query(`
            DELETE FROM cursos WHERE id = '${id}'
        `);
        
        return result.rowCount;

    } catch (e) {
        console.log(e);
    }
};

module.exports = { nuevoCurso, prepararCurso, editarCurso, eliminarCurso };