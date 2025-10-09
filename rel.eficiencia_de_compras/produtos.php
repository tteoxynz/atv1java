<?php
require 'db.php';

$action = $_GET['action'] ?? '';

if ($action === 'listar') {
    $stmt = $pdo->query("SELECT * FROM produtos ORDER BY id DESC");
    echo json_encode($stmt->fetchAll());
    exit;
}

if ($action === 'adicionar') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("INSERT INTO produtos (produto, fornecedor, quantidade, status, observacao) VALUES (?,?,?,?,?)");
    $stmt->execute([$data['produto'], $data['fornecedor'], $data['quantidade'], $data['status'], '']);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'editar') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare("UPDATE produtos SET produto=?, fornecedor=?, quantidade=?, status=?, observacao=? WHERE id=?");
    $stmt->execute([$data['produto'], $data['fornecedor'], $data['quantidade'], $data['status'], $data['observacao'], $data['id']]);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'excluir') {
    $id = intval($_GET['id']);
    $stmt = $pdo->prepare("DELETE FROM produtos WHERE id=?");
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);
    exit;
}

?>
