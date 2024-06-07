var aquarioModel = require("../models/aquarioModel");

function buscarPartidasPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarPartidasPorUsuario(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarPartidasOrdenadasPorMovimento(req, res) {
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarPartidasOrdenadasPorMovimento(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarPartidasOrdenadasPorTempo(req, res) {
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarPartidasOrdenadasPorTempo(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarAsUltimasDezPartidasDoUsuario(req, res) {
  const limite_linhas = 10;

  var idUsuario = req.params.idUsuario;

  console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

  aquarioModel.buscarAsUltimasDezPartidasDoUsuario(idUsuario, limite_linhas)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
        console.log(res.status(200).json(resultado));
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function topCincoPartidasOrdenadasPorMovimento(req, res) {
  aquarioModel.topCincoPartidasOrdenadasPorMovimento()
    .then(function (resultado) {
      if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as partidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function topCincoPartidasOrdenadasPorTempo(req, res) {
  aquarioModel.topCincoPartidasOrdenadasPorTempo()
    .then(function (resultado) {
      if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as partidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPartidasEmTempoReal(req, res) {
  var idUsuario = req.params.idUsuario;

  console.log(`Recuperando medidas em tempo real`);

  aquarioModel.buscarPartidasEmTempoReal(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as ultimas medidas.",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarPartidasPorUsuario,
  buscarAsUltimasDezPartidasDoUsuario,
  buscarPartidasEmTempoReal,
  buscarPartidasOrdenadasPorMovimento,
  buscarPartidasOrdenadasPorTempo,
  topCincoPartidasOrdenadasPorMovimento,
  topCincoPartidasOrdenadasPorTempo
}