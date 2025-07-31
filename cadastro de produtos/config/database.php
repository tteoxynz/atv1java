<?php
$conn = new mysqli("localhost", "root", "", "panificadora");
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados");
}
?>