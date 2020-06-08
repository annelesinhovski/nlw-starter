const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

//ligar o servidor
server.listen(3000)


// configurar caminhos da minha aplicação 

// pagina inicial
server.get("/", (req, res) => {
    return res.render("index.html")
}) 

// cadastrar ponto de coleta
server.get("/cadastrar-ponto-coleta", (req, res) => {
    return res.render("cadastrar-ponto-coleta.html")
}) 
server.post("/savepoint", (req,res) => {
    // inserir dados no banco
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

    console.log(values);

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("cadastrar-ponto-coleta.html", {saved: true})
    }
    db.run(query, values, afterInsertData )    
})

// resultado de pesquisa
server.get("/resultado-pesquisa", (req, res) => {
    const search = req.query.search;

    if (search == "") {
        // pesquisa vazia
        return res.render("resultado-pesquisa.html", {total: 0})
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página com os dados do banco
        return res.render("resultado-pesquisa.html", {places: rows, total: total})
    })
})


