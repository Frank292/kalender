<?php 
header('Content-Type: application/json');
$date =  $_GET["selectedDate"];

$servername = "localhost";
$user = "root";
$pw = "";
$db = "calender";

$con = new mysqli($servername, $user, $pw, $db);
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

$sql = "SELECT year, event FROM events WHERE date = '$date'";
$result = $con->query($sql);

echo json_encode($result->fetch_all());

$con->close();
?>