<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// 获取POST数据
$name = $_POST["name"];
$gender = $_POST["gender"];
$role = $_POST["role"];
$certificate_number = $_POST["certificate_number"];

// 将证书信息和条形码存储到MySQL数据库中
$sql = "INSERT INTO certificates (name, gender, role, certificate_number) VALUES ('$name', '$gender', '$role', '$certificate_number')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
