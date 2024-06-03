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

function buscarUltimasCincoPartidasPorUsuario(req, res) {
  const limite_linhas = 5;

  var idUsuario = req.params.idUsuario;

  console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

  aquarioModel.buscarUltimasCincoPartidasPorUsuario(idUsuario, limite_linhas)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
        console.log(res.status(200).json(resultado));
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


// function cadastrar(req, res) {
//   var descricao = req.body.descricao;
//   var idUsuario = req.body.idUsuario;

//   if (descricao == undefined) {
//     res.status(400).send("descricao está undefined!");
//   } else if (idUsuario == undefined) {
//     res.status(400).send("idUsuario está undefined!");
//   } else {


//     aquarioModel.cadastrar(descricao, idUsuario)
//       .then((resultado) => {
//         res.status(201).json(resultado);
//       }
//       ).catch((erro) => {
//         console.log(erro);
//         console.log(
//           "\nHouve um erro ao realizar o cadastro! Erro: ",
//           erro.sqlMessage
//         );
//         res.status(500).json(erro.sqlMessage);
//       });
//   }
// }

module.exports = {
  buscarPartidasPorUsuario,
  buscarUltimasCincoPartidasPorUsuario,
  buscarPartidasEmTempoReal,
  // cadastrar
}