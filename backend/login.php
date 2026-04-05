<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

require 'db.php';

$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

$stmt = $conn->prepare('SELECT password, email FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->bind_result($hashed, $storedEmail);
$stmt->fetch();

if (!$hashed) {
    echo json_encode(['success' => false, 'message' => 'User not registered.']);
    exit;
}

if (password_verify($password, $hashed)) {
    echo json_encode(['success' => true, 'email' => $storedEmail]);
} else {
    echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
}
?>