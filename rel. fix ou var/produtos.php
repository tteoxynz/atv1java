<?php
$servername = "localhost";
$username = "root";      // Coloque seu usuário MySQL
$password = "";          // Coloque sua senha MySQL
$dbname = "relatorio_compras";

// Conexão
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Definir charset
$conn->set_charset("utf8");

// Receber ação
$action = $_GET['action'] ?? '';

if ($action == 'listar') {
    $result = $conn->query("SELECT * FROM produtos ORDER BY id DESC");
    $produtos = [];
    while($row = $result->fetch_assoc()){
        $produtos[] = $row;
    }
    echo json_encode($produtos);
}

elseif ($action == 'adicionar') {
    $tipo = $_POST['tipo_compra'];
    $produto = $_POST['produto'];
    $fornecedor = $_POST['fornecedor'];
    $data = $_POST['data_compra'];
    $valor = $_POST['valor'];
    $frequencia = $_POST['frequencia'];
    $obs = $_POST['observacao'];

    $stmt = $conn->prepare("INSERT INTO produtos (tipo_compra, produto, fornecedor, data_compra, valor, frequencia, observacao) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssdss", $tipo, $produto, $fornecedor, $data, $valor, $frequencia, $obs);
    $stmt->execute();
    echo json_encode(['success'=>true]);
}

elseif ($action == 'editar') {
    $id = $_POST['id'];
    $campo = $_POST['campo'];
    $valor = $_POST['valor'];

    $stmt = $conn->prepare("UPDATE produtos SET $campo=? WHERE id=?");
    $stmt->bind_param("si", $valor, $id);
    $stmt->execute();
    echo json_encode(['success'=>true]);
}

elseif ($action == 'excluir') {
    $id = $_POST['id'];
    $stmt = $conn->prepare("DELETE FROM produtos WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(['success'=>true]);
}

$conn->close();
?>

