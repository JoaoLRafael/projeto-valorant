var database = require("../database/config");

// function buscarUltimasMedidas(idAquario, limite_linhas) {

//     var instrucaoSql = `SELECT
//         dht11_temperatura as temperatura,
//         dht11_umidade as umidade,
//                         momento,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
//                     FROM medida
//                     WHERE fk_aquario = ${idAquario}
//                     ORDER BY id DESC LIMIT ${limite_linhas}`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

function publicarPartida(qtdMovimento, tempoConclusao, idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ",
    qtdMovimento,
    tempoConclusao,
    idUsuario
  );
  var instrucaoSql = `
        INSERT INTO historicoPartida (fkUsuario, fkJogo, qtdMovimento, tempoConclusao, dataPartida) VALUES (${idUsuario}, 1, ${qtdMovimento}, '${tempoConclusao}', NOW());
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimasPartidas(idUsuario, limite_linhas) {
  var instrucaoSql = `SELECT 
        tempoConclusao as tempoDeConclusao, 
        qtdMovimento as movimentos,
                        dataPartida,
                        DATE_FORMAT(dataPartida,'%H:%i:%s') as dataPartida
                    FROM historicoPartida
                    WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC LIMIT ${limite_linhas}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPartidasEmTempoReal(idUsuario) {
  var instrucaoSql = `SELECT 
    tempoConclusao as tempoDeConclusao, 
    qtdMovimento as movimentos,
                    dataPartida,
                    DATE_FORMAT(dataPartida,'%H:%i:%s') as dataPartida
                FROM historicoPartida
                WHERE fkUsuario = ${idUsuario}
                    ORDER BY id DESC LIMIT 1`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// function buscarMedidasEmTempoReal(idAquario) {
//   var instrucaoSql = `SELECT 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         FROM medida WHERE fk_aquario = ${idAquario} 
//                     ORDER BY id DESC LIMIT 1`;

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }

module.exports = {
//   buscarUltimasMedidas,
//   buscarMedidasEmTempoReal,
  buscarUltimasPartidas,
  publicarPartida,
  buscarPartidasEmTempoReal,
};
