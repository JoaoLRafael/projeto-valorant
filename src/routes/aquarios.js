var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/aquarioController");

router.get("/:idUsuario", function (req, res) {
  aquarioController.buscarPartidasPorUsuario(req, res);
});

router.get("/ultimas-partidas/:idUsuario", function (req, res) {
  aquarioController.buscarUltimasCincoPartidasPorUsuario(req, res);
});

router.get("/partida-tempo-real/:idUsuario", function (req, res) {
  aquarioController.buscarPartidasEmTempoReal(req, res);
})

// router.post("/cadastrar", function (req, res) {
//   aquarioController.cadastrar(req, res);
// })

module.exports = router;