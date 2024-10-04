<?php
$server = "localhost";
$username = "root";
$password = ""; // Leave this empty if you don't have a password in XAMPP
$dbname = "register";

$con = mysqli_connect($server, $username, $password, $dbname);
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Capture form data
$username = $_POST['username'];
$mobile = $_POST['mobile'];
$pwd = $_POST['pwd'];
$cpwd = $_POST['pwd-repeat'];

if ($pwd !== $cpwd) {
    die("Passwords do not match.");
}

// Hashing the password before storing it
$hashed_pwd = password_hash($pwd, PASSWORD_DEFAULT);

// Prepared statement to avoid SQL injection
$stmt = $con->prepare("INSERT INTO registeration (username, mobile, pwd, pwd-repeat) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $username, $mobile, $hashed_pwd, $cpwd);

if ($stmt->execute()) {
    echo "Data submitted successfully! <a href='homepage.html'>Click here</a> to return to homepage.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$con->close();
?>