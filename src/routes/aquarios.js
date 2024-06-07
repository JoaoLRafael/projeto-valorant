var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/aquarioController");

router.get("/todas-partidas/:idUsuario", function (req, res) {
  aquarioController.buscarPartidasPorUsuario(req, res);
});

router.get("/ultimas-partidas/:idUsuario", function (req, res) {
  aquarioController.buscarAsUltimasDezPartidasDoUsuario(req, res);
});

router.get("/top-cinco-movimento", function (req, res) {
  aquarioController.topCincoPartidasOrdenadasPorMovimento(req, res);
});

router.get("/top-cinco-tempo", function (req, res) {
  aquarioController.topCincoPartidasOrdenadasPorTempo(req, res);
});

router.get("/partida-tempo-real/:idUsuario", function (req, res) {
  aquarioController.buscarPartidasEmTempoReal(req, res);
})

router.get("/partida-ordenada-movimento/:idUsuario", function (req, res) {
  aquarioController.buscarPartidasOrdenadasPorMovimento(req, res);
})

router.get("/partida-ordenada-tempo/:idUsuario", function (req, res) {
  aquarioController.buscarPartidasOrdenadasPorTempo(req, res);
})

module.exports = router;