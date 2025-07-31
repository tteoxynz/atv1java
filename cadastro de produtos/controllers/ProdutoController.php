<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Produto.php';

$produtoModel = new Produto($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    echo json_encode($produtoModel->listar());
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $quantidade = $_POST['quantidade'] ?? 0;
    $preco = $_POST['preco'] ?? 0;
    header('Content-Type: application/json');
    if ($produtoModel->inserir($nome, $quantidade, $preco)) {
        echo json_encode(["sucesso" => true, "mensagem" => "Produto cadastrado com sucesso!"]);
    } else {
        echo json_encode(["erro" => "Erro ao cadastrar produto."]);
    }
}
?>