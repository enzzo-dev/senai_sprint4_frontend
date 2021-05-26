USE WishList;

SELECT D.Descricao AS Desejo,D.DataCriacao,U.email AS CriadoPor FROM Desejos D
INNER JOIN Usuarios U
ON D.idUsuario = U.idUsuario;

SELECT email AS Email FROM Usuarios;