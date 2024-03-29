const express = require("express");
const app = express();
const PORT = 3306;
const mysql = require("mysql");
const cors = require("cors");

//cria uma conexão com o banco de dados
const connection = mysql.createConnection({
    host: '34.151.200.120',
    port: 3306,
    user: "raiane",
    password: "adm1123",
    database: "docks-pi"
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { idEmail, nome, senha } = req.body;
    const SQL = "INSERT INTO usuario (idEmail, nome, senha) VALUES (?, ?, ?)";
   
    connection.query(SQL, [idEmail, nome, senha], (err, result) => {
        if (err) console.log(err)
        else res.send(result)
    });
});

  app.get("/getCards", (req, res, next) => {
    const SQL = "SELECT * FROM usuario";
   
    connection.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.send(result);
        }
    });

    //as chaves abaixo usam o const {idEmail}
    connection.query(SQL, (err, result) => {
        console.log(err);
    })
});


app.put("/editUsuario", (req, res) => {
    const { idEmail, nome, senha } = req.body;
    let SQL = "UPDATE usuario SET idEmail=?, nome=?, senha=? WHERE idEmail=?";
  
    connection.query(SQL, [idEmail, nome, senha, idEmail], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
});

app.delete("/delete/:idEmail",(req,res)=>{
    const{idEmail}= req.params;
    let SQL = "DELETE FROM usuario WHERE idEMail=?";
    
    connection.query(SQL,[idEmail], (err,result)=>{
        if(err) console.log(err);
        else res.send(result);
    });
});

//Testando conexão com o banco ao criar um cadastro
// app.get("/", (req, res) => {
//     let SQL = "INSERT INTO usuario (idEmail, nome, senha ) VALUES ('test.connection@gmail.com','first conn2','first11')" 

//     connection.query(SQL, (err, result) => {
//         console.log(err);
//     })
// })

//abre uma nova conexão com o mysql
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to database: " + err.stack);
            process.exit(1);
        }
        console.log("Connected to database as id " + connection.threadId);
        app.locals.connection = connection;
    });
});

module.exports = connection;
