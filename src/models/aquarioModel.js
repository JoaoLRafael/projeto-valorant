var database = require("../database/config");

function buscarPartidasPorUsuario(idUsuario) {
  var instrucaoSql = `SELECT * FROM historicoPartida a WHERE fkUsuario = ${idUsuario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPartidasOrdenadasPorMovimento(idUsuario) {
  var instrucaoSql = `SELECT * FROM historicoPartida a WHERE fkUsuario = ${idUsuario} ORDER BY qtdMovimento`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPartidasOrdenadasPorTempo(idUsuario) {
  var instrucaoSql = `SELECT * FROM historicoPartida a WHERE fkUsuario = ${idUsuario} ORDER BY tempoConclusao`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarAsUltimasDezPartidasDoUsuario(idUsuario, limite_linhas) {
  var instrucaoSql = `SELECT 
        idPartida, tempoConclusao, 
        qtdMovimento as movimentos,
                        DATE_FORMAT(dataPartida,'%d/%m/%y ás %H:%i:%s') as dataPartida
                    FROM historicoPartida
                    WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC LIMIT ${limite_linhas}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function topCincoPartidasOrdenadasPorMovimento() {
  var instrucaoSql = `SELECT 
        username, idPartida, tempoConclusao, 
        qtdMovimento as movimentos,
                        DATE_FORMAT(dataPartida,'%d/%m/%y ás %H:%i:%s') as dataPartida
                    FROM historicoPartida JOIN usuario ON fkUsuario = idUsuario
                    ORDER BY qtdMovimento LIMIT 5`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function topCincoPartidasOrdenadasPorTempo() {
  var instrucaoSql = `SELECT 
        username, idPartida, tempoConclusao, 
        qtdMovimento as movimentos,
                        DATE_FORMAT(dataPartida,'%d/%m/%y ás %H:%i:%s') as dataPartida
                    FROM historicoPartida JOIN usuario ON fkUsuario = idUsuario
                    ORDER BY tempoConclusao LIMIT 5`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPartidasEmTempoReal(idUsuario) {
  var instrucaoSql = `SELECT 
    idPartida,
    tempoConclusao as tempoDeConclusao, 
    qtdMovimento as movimentos,
    DATE_FORMAT(dataPartida,'%d/%m/%y ás %H:%i:%s') as dataPartida
                FROM historicoPartida
                WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC LIMIT 1`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPartidasPorUsuario,
  buscarAsUltimasDezPartidasDoUsuario,
  buscarPartidasEmTempoReal,
  buscarPartidasOrdenadasPorMovimento,
  buscarPartidasOrdenadasPorTempo,
  topCincoPartidasOrdenadasPorMovimento,
  topCincoPartidasOrdenadasPorTempo
};