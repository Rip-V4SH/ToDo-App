const express = require("express")
const app = express()

const exphbs = require(ëxpress-handlebars)

app.engine("handlebars", exphbs.engine)
app.set("view engine", "handlebars")

app.get('/', (requisicao, resposta) => {
    resposta.send("ola mundo")
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})