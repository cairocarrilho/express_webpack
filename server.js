require('dotenv').config();

const express = require('express');
const app = express();

//Connect banco de dados
const mongoose = require('mongoose');
const connectDB = process.env.CONNECTION_STRING

mongoose.connect(connectDB)
    .then(()=> {
        // faz com que connect a base de dados antes de ser assistindo
        app.emit('Connect')
    })
    .catch(e=>console.log(e));

//conexao do banco para salvar cookes e outras coisas
const session = require('express-session'); // chavar o cookies do cliente no proprio computador do cliente
const connectMongo = require('connect-mongo');// salva as sessoes na base de dados em vez do servidor porque pode consumir a memoria muito rapido
const flash = require('connect-flash'); // Enviar mensagem de feedback ou de erro, salvos em session

const router = require('./routers/router');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf')
const {myMiddleware,checkCsrfError,csrfMiddleware} = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(helmet())
const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: connectMongo.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
});

app.use(flash());
app.use(sessionOptions);

app.set('views',path.resolve(__dirname, 'src','views'))
app.set('view engine', 'ejs');

app.use(csrf())
//nosso proprios middleware\
app.use(myMiddleware)
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(router)


// apos pegar o emit "Connect ele aparece a mensagem de conectado e o link do localhost"
app.on('Connect',()=> {
    app.listen(3000, ()=> console.log( `Acessar pelo link http://localhost:3000/`));
})
