const express = require("express");
const server = express();

// Pegar o banco de dados
const db = require("./database/db");

//Configurar pasta publica
server.use(express.static("public"))

// habilitar o uo do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//Utilizando tamplates engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true       //Para não ficar carregando dados dá pagina anterior quando atualizar
})

//Configurar caminhos da minha aplicação
// Página inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um titulo "});  //render: Está ligado ao nunjucks
})

server.get("/create-point", (req, res) => {

    //console.log(req.query)

    return res.render("create-point.html");
})



server.post("/savepoint", (req, res) => {

    //console.log(req.body)

    //inserir dados nobanco de dados

     //criar uma tabela com comandos SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // inserir dados na tabela
    const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?); 
        `

    const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
    ]

    function afterInsertData(err) {
        if(err){
           console.log(err);
           return res.send("Erro no cadastro");
        }        

        console.log("Cadastrado com sucesso!");
        console.log(this);

        return res.render("create-point.html", { saved: true} )
    } 

     db.run(query, values, afterInsertData);
})


server.get("/search", (req, res) => {

    const search = req.query.search;
    if(search == ""){
        //pequisa vazia
        return res.render("search-results.html", { total: 0 });
    }

    
    // pegar os dados do banco de dados
     db.all(`SELECT * FROM PLACES WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length;

        //Mostrar a página HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total });
    }) 

})

// Ligar o servidor
server.listen(3000);

