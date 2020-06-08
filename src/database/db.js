const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá operar no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// exportar o objeto
module.exports = db

// utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
    // criar uma tabela
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
        )
    `)
    // // inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    // const values = [
    //     "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=861&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Número 290",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis e papelão"
    // ]
    
    // function afterInsertData(err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData )

    // consultar os dados na tabela
    // db.all(`SELECT * FROM places`, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros:")
    //     console.log(rows)
    // })

    //deletar os dados da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [7], function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Registros deletados com sucesso:")
    //     console.log(rows)
    // })
})
