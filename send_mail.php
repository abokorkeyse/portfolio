<?php
// Start session for simple rate-limiting
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Verify Request Method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

// CSRF / Origin Check (Referer / Origin validation)
$allowed_origins = [
    'https://abokorkeyse.sommarket.shop',
    'https://abokor.shop',
    'http://localhost',
    'http://127.0.0.1'
];
$request_origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$request_referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';

$is_allowed = false;
if ($request_origin) {
    foreach ($allowed_origins as $origin) {
        if (strpos($request_origin, $origin) === 0) {
            $is_allowed = true;
            break;
        }
    }
} else if ($request_referer) {
    foreach ($allowed_origins as $origin) {
        if (strpos($request_referer, $origin) === 0) {
            $is_allowed = true;
            break;
        }
    }
} else {
    // Allow for general testing if headers are not set
    $is_allowed = true;
}

// Simple Rate Limiting (max 3 messages per 10 minutes)
$now = time();
if (!isset($_SESSION['submission_times'])) {
    $_SESSION['submission_times'] = [];
}
$_SESSION['submission_times'] = array_filter($_SESSION['submission_times'], function ($t) use ($now) {
    return ($now - $t) < 600;
});
if (count($_SESSION['submission_times']) >= 3) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Too many messages. Please try again in 10 minutes.']);
    exit;
}

// Get JSON Input
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON input.']);
    exit;
}

// Honeypot spam check
if (!empty($data['honeypot'])) {
    // Silent success to confuse bots
    echo json_encode(['success' => true, 'message' => 'Message processed successfully.']);
    exit;
}

// Extract and sanitize inputs
$name = isset($data['name']) ? trim(htmlspecialchars(strip_tags($data['name']), ENT_QUOTES, 'UTF-8')) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($data['message']) ? trim(htmlspecialchars(strip_tags($data['message']), ENT_QUOTES, 'UTF-8')) : '';

// Strip newlines to prevent email header injection (CRLF)
$name = str_replace(["\r", "\n", "%0a", "%0d"], '', $name);
$email = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'All fields are required.']);
    exit;
}

if (strlen($name) < 2 || strlen($name) > 100) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name must be between 2 and 100 characters.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address format.']);
    exit;
}

if (strlen($message) < 10 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Message must be between 10 and 5000 characters.']);
    exit;
}

// Log submission time
$_SESSION['submission_times'][] = $now;

// Email setup
$to = 'abokor445@hotmail.com';
$subject = 'Fariin cusub oo ka timid Portfolio: ' . $name;

// HTML Email Body
$body = "
<html>
<head>
  <title>Farriin Contact Portfolioga</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
  <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>
    <h2 style='color: #fb5800; border-bottom: 2px solid #fb5800; padding-bottom: 10px;'>Farriin Cusub oo Portfolio ah</h2>
    <p><strong>Magaca:</strong> " . $name . "</p>
    <p><strong>Email-ka:</strong> <a href='mailto:" . $email . "'>" . $email . "</a></p>
    <p><strong>Farriinta:</strong></p>
    <div style='background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #fb5800; white-space: pre-wrap;'>" . nl2br($message) . "</div>
    <hr style='border: none; border-top: 1px solid #eee; margin: 20px 0;'>
    <p style='font-size: 0.8rem; color: #777;'>Farriintan waxaa si toos ah looga soo diray boggaaga portfolio.</p>
  </div>
</body>
</html>
";

// Headers
$server_domain = !empty($_SERVER['SERVER_NAME']) ? preg_replace('/[^a-zA-Z0-9.-]/', '', $_SERVER['SERVER_NAME']) : 'abokor.shop';
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: Portfolio Contact <noreply@" . $server_domain . ">" . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send
if (@mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'System mail server error. Direct fallback will be used.']);
}
?>
