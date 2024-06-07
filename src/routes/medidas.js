var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/publicar-partida/:idUsuario", function (req, res) {
    medidaController.publicarPartida(req, res);
});

module.exports = router;