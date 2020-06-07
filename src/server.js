const express = require("express")
const server = express()

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar pasta pública
server.use(express.static("public"))

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
// resultado de pesquisa
server.get("/resultado-pesquisa", (req, res) => {
    return res.render("resultado-pesquisa.html")
})


