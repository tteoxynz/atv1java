-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS relatorio_compras;
USE relatorio_compras;

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_compra ENUM('Fixa','Variável') NOT NULL,
    produto VARCHAR(255) NOT NULL,
    fornecedor VARCHAR(255) NOT NULL,
    data_compra DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    frequencia ENUM('Mensal','Anual') NOT NULL,
    observacao TEXT
);
