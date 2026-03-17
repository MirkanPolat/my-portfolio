<?php

$allowed_origins = [
    'https://mirkanpolat.com',
    'https://www.mirkanpolat.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");

error_reporting(0);
ini_set('display_errors', 0);

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
        http_response_code(200);
        exit;

    case "POST":
        try {
            // Content-Type prüfen
            $content_type = $_SERVER['CONTENT_TYPE'] ?? '';
            if (stripos($content_type, 'application/json') === false) {
                http_response_code(415);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Unsupported media type'
                ]);
                exit;
            }

            // Rate Limiting (max 5 Anfragen pro Minute pro IP)
            $rate_limit_dir = sys_get_temp_dir() . '/mail_rate_limit/';
            if (!is_dir($rate_limit_dir)) {
                mkdir($rate_limit_dir, 0700, true);
            }
            $ip_hash = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
            $rate_file = $rate_limit_dir . $ip_hash;

            $requests = [];
            if (file_exists($rate_file)) {
                $requests = json_decode(file_get_contents($rate_file), true) ?: [];
                $requests = array_filter($requests, function ($ts) {
                    return $ts > time() - 60;
                });
            }

            if (count($requests) >= 5) {
                http_response_code(429);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Too many requests. Please try again later.'
                ]);
                exit;
            }

            $requests[] = time();
            file_put_contents($rate_file, json_encode($requests), LOCK_EX);

            // Alte Rate-Limit-Dateien aufräumen (älter als 2 Minuten)
            $cleanup_files = glob($rate_limit_dir . '*');
            if ($cleanup_files) {
                foreach ($cleanup_files as $file) {
                    if (is_file($file) && filemtime($file) < time() - 120) {
                        @unlink($file);
                    }
                }
            }

            $json = file_get_contents('php://input');

            if (empty($json)) {
                throw new Exception('No JSON data received');
            }

            $params = json_decode($json, true);

            if (!$params) {
                throw new Exception('Invalid JSON format');
            }

            // Honeypot-Feld prüfen (muss leer sein)
            if (!empty($params['website'])) {
                http_response_code(200);
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Email sent successfully'
                ]);
                exit;
            }

            if (empty($params['email']) || empty($params['name']) || empty($params['message'])) {
                throw new Exception('Missing required fields');
            }

            $email = trim($params['email']);
            $name = trim($params['name']);
            $message = trim($params['message']);

            // Eingabelängen begrenzen
            if (mb_strlen($name) > 100 || mb_strlen($email) > 254 || mb_strlen($message) > 5000) {
                throw new Exception('Input too long');
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Invalid email format');
            }

            // Header Injection verhindern
            $name = str_replace(["\r", "\n", "%0a", "%0d"], '', $name);
            $email = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);

            $recipient = 'kontakt@mirkanpolat.com';
            $subject = '=?UTF-8?B?' . base64_encode('Contact From ' . $name) . '?=';
            $body = "Name: " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "<br><br>";
            $body .= "Email: " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "<br><br>";
            $body .= "Message:<br>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

            $headers = array();
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=utf-8';
            $headers[] = 'From: kontakt@mirkanpolat.com';
            $headers[] = 'Reply-To: ' . $email;

            $success = mail($recipient, $subject, $body, implode("\r\n", $headers));

            if ($success) {
                http_response_code(200);
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Email sent successfully'
                ]);
            } else {
                throw new Exception('Failed to send email');
            }

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'An error occurred'
            ]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode([
            'status' => 'error',
            'message' => 'Method not allowed'
        ]);
        exit;
}
