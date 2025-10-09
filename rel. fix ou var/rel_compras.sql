CREATE DATABASE IF NOT EXISTS sistema_compras;
USE sistema_compras;

-- Tabela: rel_compras
CREATE TABLE IF NOT EXISTS rel_compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_compra VARCHAR(50) NOT NULL,         -- Fixa ou Variável
    produto VARCHAR(100) NOT NULL,
    fornecedor VARCHAR(100) NOT NULL,
    data_compra DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    frequencia VARCHAR(50),
    observacao VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo registros de exemplo
INSERT INTO rel_compras (tipo_compra, produto, fornecedor, data_compra, valor, frequencia, observacao)
VALUES
('Fixa', 'Produto A', 'Fornecedor 1', '2025-06-06', 500.00, 'mensal', 'Contrato de 10 meses'),
('Variável', 'Produto B', 'Fornecedor 2', '2025-06-08', 1000.00, 'mensal', 'Contrato de 12 meses');