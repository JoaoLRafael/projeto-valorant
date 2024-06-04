var database = require("../database/config");

function buscarPartidasPorUsuario(idUsuario) {
  var instrucaoSql = `SELECT * FROM historicoPartida a WHERE fkUsuario = ${idUsuario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasCincoPartidasPorUsuario(idUsuario, limite_linhas) {
  var instrucaoSql = `SELECT 
        idPartida, tempoConclusao as tempoDeConclusao, 
        qtdMovimento as movimentos,
                        dataPartida,
                        DATE_FORMAT(dataPartida,'%d/%m/%y ás %H:%i:%s') as dataPartida
                    FROM historicoPartida
                    WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC LIMIT ${limite_linhas}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPartidasEmTempoReal(idUsuario) {
  var instrucaoSql = `SELECT 
    idPartida,
    tempoConclusao as tempoDeConclusao, 
    qtdMovimento as movimentos,
                    dataPartida,
                    DATE_FORMAT(dataPartida,'%H:%i:%s') as dataPartida
                FROM historicoPartida
                WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC LIMIT 1`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// function cadastrar(empresaId, descricao) {

//   var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }

module.exports = {
  buscarPartidasPorUsuario,
  buscarUltimasCincoPartidasPorUsuario,
  buscarPartidasEmTempoReal,
  // cadastrar
};