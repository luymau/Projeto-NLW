// Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose(); //"verbose": quero ver sempre mensagem no terminal depois de atualizar as informações

// Criar onjeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db;
// Utilizar o objeto de banco de dados para nossas operações
  db.serialize( () => { //Vai rodar uma sequencia de codigo
     
    //criar uma tabela com comandos SQL
   /* db.run(`
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
        "https://images.unsplash.com/photo-1558583055-d7ac00b1adca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Reiduos Eletronicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err){
            return console.log(err);
        }        

        console.log("Cadastrado com sucesso!");
        console.log(this);
    } */

    // db.run(query, values, afterInsertData);


 // Consultar os dados da tabela
 /* db.all(`SELECT * FROM PLACES`, function(err, rows) {
    if(err){
        return console.log(err)
    }

    console.log("Aqui estão seus registros");
    console.log(rows)
}) */


   // Deletar um dado da tabela
   /*
   db.run(`DELETE FROM places where id = ?`, [4], function(err) {
    if(err){
        return console.log(err)
    }

    console.log("Registro deletado com sucesso")
   }) 
*/

   


    } )

