const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// converter dados do formulario em objeto JS
app.use(express.urlencoded({
    extended: true
}))

// rotas
app.get('/limpar', (requisicao, resposta) => {
    const sql = 'DELETE FROM tarefas'

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        }

        resposta.redirect('/')
    })
})

app.post('/excluir', (requisicao, resposta) => {
    const id = requisicao.body.id

    const sql = `
        DELETE FROM tarefas
        WHERE id = ${id}
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        }

        resposta.redirect('/')
    })
})

app.post('/descompletar', (requisicao, resposta) => {
    const sql = `
        UPDATE tarefas
        SET completa = 0
        WHERE id = ${id}
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        }
        
        resposta.redirect('/')
    })
})

app.post('/completar', (requisicao, resposta) => {
    const id = requisicao.body.id
    
    const sql = `
        UPDATE tarefas
        SET completa = 1
        WHERE id = ${id}
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        }
        
        resposta.redirect('/')
    })
})

app.post('/criar', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao
    const completa = 0

    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES ('${descricao}', '${completa}')
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        } 
        
        resposta.redirect('/')
    })
})

app.get('/completas', (requisicao, resposta) => {
    const sql = `
        SELECT * FROM tarefas
        WHERE completa = 1
    `

    conexao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: true
            }
        })

        const QtdTarefas = tarefas.length

        resposta.render('completas', {tarefas, QtdTarefas})
    })
})

app.get('/ativas', (requisicao, resposta) => {
    const sql = `
        SELECT * FROM tarefas
        WHERE completa = 0
    `

    conexao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: false
            }
        })

        const QtdTarefas = tarefas.length

        resposta.render('ativas', {tarefas, QtdTarefas})
    })
})

app.get('/', (requisicao, resposta) => {
    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
            }
        })

        const tarefasativas = tarefas.filter((tarefa) => {
            return tarefa.completa === false && tarefa
        })

        const QtdTarefasAtivas = tarefasativas.length

        resposta.render("home", { tarefas, QtdTarefasAtivas })
        
    })
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
    port: "3306"
})

conexao.connect((erro) => {
    if (erro) {
        return console.log(erro)
    }
    
    console.log("conectado ao mysql")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000")
    })
    
})