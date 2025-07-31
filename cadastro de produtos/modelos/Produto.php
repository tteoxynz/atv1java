<?php
class Produto {
    private $conn;
    public function __construct($conn) {
        $this->conn = $conn;
    }
    public function listar() {
        $sql = "SELECT id, nome, quantidade, preco FROM produtos";
        $resultado = $this->conn->query($sql);
        $produtos = [];
        while ($linha = $resultado->fetch_assoc()) {
            $produtos[] = $linha;
        }
        return $produtos;
    }
    public function inserir($nome, $quantidade, $preco) {
        $nome = $this->conn->real_escape_string($nome);
        $quantidade = (int)$quantidade;
        $preco = (float)$preco;
        $sql = "INSERT INTO produtos (nome, quantidade, preco) VALUES ('$nome', $quantidade, $preco)";
        return $this->conn->query($sql);
    }
}
?>