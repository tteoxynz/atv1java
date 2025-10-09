CREATE DATABASE rel_compras;

USE rel_compras;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(100) NOT NULL,
    fornecedor VARCHAR(50) NOT NULL,
    quantidade INT NOT NULL,
    status ENUM('Alta','Média','Baixa') NOT NULL,
    observacao TEXT
);
