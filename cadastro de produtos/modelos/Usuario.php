<?php
class Usuario {
    private $conn;
    public function __construct($conn) {
        $this->conn = $conn;
    }
    public function listar() {
        $sql = "SELECT id, nome, email FROM usuarios";
        $resultado = $this->conn->query($sql);
        $usuarios = [];
        while ($linha = $resultado->fetch_assoc()) {
            $usuarios[] = $linha;
        }
        return $usuarios;
    }
    public function inserir($nome, $email) {
        $nome = $this->conn->real_escape_string($nome);
        $email = $this->conn->real_escape_string($email);
        $sql = "INSERT INTO usuarios (nome, email) VALUES ('$nome', '$email')";
        return $this->conn->query($sql);
    }
}
?>