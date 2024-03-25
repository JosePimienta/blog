const mysql = require('mysql');

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
});

const express = require('express'); // Importa express para manejar peticiones

const app = express();

const bodyParser = require('body-parser');

const path = require('path');


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/submit-form', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'html', 'index.html'));
});

// Función para manejar el envío del formulario
app.post('/submit-form', (req, res) => {
  
  const titulo = req.body.titulo;
  const contenido = req.body.contenido;
  const fecha_publicacion = req.body.fecha_publicacion;

  //console.log(titulo);

  // Prepara la consulta SQL
  const query = `INSERT INTO blog (titulo, contenido, fecha_publicacion) VALUES (?, ?, ?)`;

  // Conexión a la base de datos y ejecución de la consulta
  connection.query(query, [titulo, contenido, fecha_publicacion], (err, results) => {
    if (err) {
      console.error(err);
      res.send('Error al enviar el formulario');
    } else {
      console.log('Formulario enviado correctamente');
      res.send('Formulario enviado correctamente');
    }
  });

  // console.log(req.body);
});


// Inicia el servidor
app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
