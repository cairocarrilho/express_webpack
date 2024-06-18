
exports.paginaInicial = (req, res, next) => {

    res.render('index'); // arquivo HTML ou outro que esta na pagina do View
    next();
}

exports.trataPost  = (req, res) => {
    res.send(req.body.cliente)

}





