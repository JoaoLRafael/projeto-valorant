CREATE DATABASE projetoValorant;
USE projetoValorant;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(100),
    email VARCHAR(300),
    senha VARCHAR(100)
);

CREATE TABLE jogo (
	idJogo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao VARCHAR(300)
);

CREATE TABLE historicoPartida (
  idPartida INT AUTO_INCREMENT,
  fkUsuario INT,
  fkJogo INT,
  CONSTRAINT pkPartida PRIMARY KEY (idPartida, fkUsuario, fkJogo),
  qtdMovimento INT,
  tempoConclusao TIME,
  dataPartida DATETIME
);

ALTER TABLE historicoPartida ADD CONSTRAINT fkHistoricoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario);
ALTER TABLE historicoPartida ADD CONSTRAINT fkHistoricoJogo FOREIGN KEY (fkJogo) REFERENCES jogo (idJogo);

INSERT INTO jogo (nome, descricao) VALUES
  ("Jogo da Memória", "Jogo clássico de memória, tematizado com personagens do Valorant, o jogo testa sua capacidade de memorização.");
  
INSERT INTO usuario (username, email, senha) VALUES
	('john', 'john@gmail.com', '123'),
	('jane', 'jane@gmail.com', 'jane123'),
	('neo', 'neo@gmail.com', 'neo123'),
	('nitruz', 'nitruz@gmail.com', 'nitruz123'),
	('shadow', 'shadow@gmail.com', 'shadow123');


INSERT INTO historicoPartida (fkUsuario, fkJogo, qtdMovimento, tempoConclusao, dataPartida) VALUES
	(4, 1, 20, '00:05:23', '2024-06-01 20:33:21'),
	(4, 1, 27, '00:06:54', '2024-06-01 18:45:09'),
	(4, 1, 18, '00:05:03', '2024-06-01 15:22:48'),
	(4, 1, 18, '00:04:31', '2024-06-01 12:01:37'),
	(4, 1, 21, '00:05:42', '2024-06-02 09:18:26'),
	(4, 1, 19, '00:04:29', '2024-06-02 07:34:15'),
	(4, 1, 18, '00:04:58', '2024-06-02 05:50:04'),
	(4, 1, 24, '00:06:25', '2024-06-02 04:05:53'),
	(4, 1, 18, '00:03:17', '2024-06-02 02:21:42'),
	(4, 1, 23, '00:05:35', '2024-06-02 00:37:31');
    
INSERT INTO historicoPartida (fkUsuario, fkJogo, qtdMovimento, tempoConclusao, dataPartida) VALUES
	(3, 1, 15, '00:05:23', '2024-06-03 21:11:54');
    
INSERT INTO historicoPartida (fkUsuario, fkJogo, qtdMovimento, tempoConclusao, dataPartida) VALUES
	(2, 1, 22, '00:05:57', '2024-06-03 14:06:32'),
	(2, 1, 18, '00:04:41', '2024-06-03 13:52:21'),
	(2, 1, 25, '00:06:14', '2024-06-03 13:38:10'),
	(2, 1, 19, '00:04:53', '2024-06-03 13:23:59'),
	(2, 1, 20, '00:05:16', '2024-06-03 13:09:48');

SELECT * FROM usuario;
SELECT * FROM jogo;
SELECT * FROM historicoPartida;
