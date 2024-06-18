exports.myMiddleware = (req, res, next) => {
    res.locals.umaVariavelLocal = "Este é o valor  da variavel local "
    // podemos intercepitar, modificar
    next();
};


// Middleware para nao apareceu o erro compromentendo os dados na tela, ele vai renderizar uma pagina personalizada
exports.checkCsrfError =  (err, req, res, next)=> {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('404')
    };
};


// Cria um middleware com token(uma sequencia de letras e numeros)
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}
