<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "studentdb";
$port = 3307; // Custom port we configured in XAMPP

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname, $port);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
?>