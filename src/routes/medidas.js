var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idAquario", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/ultimas-partidas/:idUsuario", function (req, res) {
    medidaController.buscarUltimasPartidas(req, res);
});

router.post("/publicar-partida/:idUsuario", function (req, res) {
    medidaController.publicarPartida(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;