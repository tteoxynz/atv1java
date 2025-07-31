<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Usuario.php';

$usuarioModel = new Usuario($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    echo json_encode($usuarioModel->listar());
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    header('Content-Type: application/json');
    if ($usuarioModel->inserir($nome, $email)) {
        echo json_encode(["sucesso" => true, "mensagem" => "Usuário cadastrado com sucesso!"]);
    } else {
        echo json_encode(["erro" => "Erro ao cadastrar usuário."]);
    }
}
?>