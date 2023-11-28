const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("myslq2")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static('public'))

app.get('/', (requisicao, resposta) => {
    // resposta.send("ola mundo")
    resposta.render("home")
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
    port: 3306,
})