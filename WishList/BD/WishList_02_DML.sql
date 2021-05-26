USE WishList;

INSERT INTO Usuarios(email,senha)
VALUES ('enzzo@email.com','admin1234'),('vinilordelo@email.com','12345'),('yuri@email.com','123456'),('giovanna@email.com','1234567');

INSERT INTO Desejos(Descricao,DataCriacao,idUsuario)
VALUES ('Ter empresa voltada para a tecnologia','2021/05/26',1),('Trabalhar como Full-Stack','2021/05/25',2);
