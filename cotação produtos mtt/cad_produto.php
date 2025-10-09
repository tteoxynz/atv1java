<?php
// Configurações do banco
$host = "localhost";
$usuario = "root";
$senha = ""; // coloque sua senha do MySQL
$banco = "sistema_compras";

// Conexão
$conn = new mysqli($host, $usuario, $senha, $banco);

// Verifica conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// ===============================
// Função para listar produtos
// ===============================
if (isset($_GET['acao']) && $_GET['acao'] == 'listar') {
    $sql = "SELECT * FROM cotacao_produtos ORDER BY produto ASC";
    $result = $conn->query($sql);

    $produtos = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $produtos[] = $row;
        }
    }
    echo json_encode($produtos);
    exit;
}

// ===============================
// Função para adicionar produto
// ===============================
if (isset($_POST['acao']) && $_POST['acao'] == 'adicionar') {
    $produto = $_POST['produto'];
    $preco = $_POST['preco'];
    $quantidade = $_POST['quantidade'];
    $prazo = $_POST['prazo'];

    $stmt = $conn->prepare("INSERT INTO cotacao_produtos (produto, preco_unitario, quantidade, prazo_entrega) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sdis", $produto, $preco, $quantidade, $prazo);
    if($stmt->execute()){
        echo json_encode(["status" => "sucesso"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => $stmt->error]);
    }
    $stmt->close();
    exit;
}

// ===============================
// Função para excluir produto
// ===============================
if (isset($_POST['acao']) && $_POST['acao'] == 'excluir') {
    $id = intval($_POST['id']);
    $stmt = $conn->prepare("DELETE FROM cotacao_produtos WHERE id = ?");
    $stmt->bind_param("i", $id);
    if($stmt->execute()){
        echo json_encode(["status" => "sucesso"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => $stmt->error]);
    }
    $stmt->close();
    exit;
}

$conn->close();
?>
