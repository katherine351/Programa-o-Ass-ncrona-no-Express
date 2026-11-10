import express from "express";

const app = express();

const PORTA = 3000;

// Rota inicial
app.get("/", (req, res) => {
    res.send("Servidor funcionando!");
});

// Exercício 1.1
function saudacaoAssincrona(nome) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Olá, ${nome}! Bem-vindo ao Mensageiro Local.`);
        }, 2000);
    });
}

// Testando a função
saudacaoAssincrona("Katherine").then(resposta => {
    console.log(resposta);
});

// Exercício 1.2
function obterMensagemPorId(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id <= 0) {
                return reject(new Error("ID inválido: deve ser maior que zero"));
            } else {
                resolve({
                    id: id,
                    texto: "Mensagem do laboratório"
                });
            }
        }, 1000);
    });
}

// Teste de sucesso
obterMensagemPorId(1)
    .then(msg => console.log("Sucesso:", msg))
    .catch(err => console.error(err.message));

// Teste de falha
obterMensagemPorId(-3)
    .then(msg => console.log("Sucesso:", msg))
    .catch(err => console.error("Erro capturado:", err.message));

// Exercício 2.1
app.get("/saudacao-then", (req, res) => {
    saudacaoAssincrona("Katherine")
        .then((mensagem) => {
            res.send(mensagem);
        });
});

// Exercício 2.2
app.get("/mensagem-invalida-then", (req, res) => {
    obterMensagemPorId(-5)
        .then((msg) => {
            res.json(msg);
        })
        .catch((erro) => {
            res.status(500).json({
                erro: erro.message
            });
        });
});

// Exercício 3.1
app.get("/saudacao-async", async (req, res) => {
    try {
        const mensagem = await saudacaoAssincrona("Aluno do Futuro");

        res.send(mensagem);

    } catch (erro) {
        res.status(500).json({
            erro: "Falha na saudação"
        });
    }
});

// Exercício 3.2
app.get("/mensagem-erro-async", async (req, res) => {
    try {
        const msg = await obterMensagemPorId(-10);

        res.json(msg);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
});

// Iniciando o servidor
app.listen(PORTA, () => {
    console.log("Servidor rodando na porta " + PORTA);
});
