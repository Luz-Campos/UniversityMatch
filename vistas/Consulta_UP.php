<?php
// Conexión a la base de datos
$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "universidades_bd";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Obtener la categoría seleccionada
$categoria = $_POST['categoria'];

// Consulta para obtener las carreras de la Universidad Panamericana en la categoría seleccionada
$sql = "SELECT nombre_carrera FROM VistaUniversidadesCarreras 
WHERE nombre_universidad = 'Universidad Panamericana' AND nombre_categoria= '$categoria'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Generar la lista de carreras
  $carreras = array();
  while($row = $result->fetch_assoc()) {
    $carreras[] = $row['nombre_carrera'];
  }
  echo json_encode($carreras);
} else {
  echo "0 resultados";
}
$conn->close();
?>
