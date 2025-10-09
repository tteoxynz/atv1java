-- =========================================
-- Banco de dados: sistema_compras
-- =========================================
CREATE DATABASE IF NOT EXISTS sistema_compras;
USE sistema_compras;

-- =========================================
-- Tabela: cotacao_produtos
-- =========================================
CREATE TABLE IF NOT EXISTS cotacao_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(100) NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    total DECIMAL(10,2) AS (preco_unitario * quantidade) STORED,
    prazo_entrega VARCHAR(50) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Inserir produtos de exemplo
-- =========================================
INSERT INTO cotacao_produtos (produto, preco_unitario, quantidade, prazo_entrega)
VALUES 
('Produto A', 1000.00, 1, '5 dias úteis'),
('Produto B', 500.00, 3, '2 dias úteis'),
('Produto C', 900.00, 2, '4 dias úteis');
