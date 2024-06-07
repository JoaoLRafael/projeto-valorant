var database = require("../database/config");

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

module.exports = {
  publicarPartida,
};
