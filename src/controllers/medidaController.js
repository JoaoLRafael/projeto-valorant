var medidaModel = require("../models/medidaModel");

function publicarPartida(req, res) {
  var qtdMovimento = req.body.qtdMovimento;
  var tempoConclusao = req.body.tempoConclusao;
  var idUsuario = req.params.idUsuario;
  console.log(qtdMovimento, tempoConclusao, idUsuario);

  if (qtdMovimento == undefined) {
    res.status(400).send("A quantidade de movimentos está indefinido!");
  } else if (tempoConclusao == undefined) {
    res.status(400).send("O tempo de conclusao está indefinido!");
  } else if (idUsuario == undefined) {
    res.status(403).send("O id do usuário está indefinido!");
  } else {
    medidaModel.publicarPartida(qtdMovimento, tempoConclusao, idUsuario)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}


module.exports = {
  publicarPartida,
};
