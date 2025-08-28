<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: content-type, Content-Type");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
        // Handle preflight requests
        http_response_code(200);
        exit;
        
    case "POST":
        try {
            // Get JSON input
            $json = file_get_contents('php://input');
            
            if (empty($json)) {
                throw new Exception('No JSON data received');
            }
            
            // Parse JSON
            $params = json_decode($json, true);
            
            if (!$params) {
                throw new Exception('Invalid JSON format');
            }
            
            // Validate required fields
            if (empty($params['email']) || empty($params['name']) || empty($params['message'])) {
                throw new Exception('Missing required fields');
            }
            
            $email = trim($params['email']);
            $name = trim($params['name']);
            $message = trim($params['message']);
            
            // Validate email format
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception('Invalid email format');
            }
            
            // Email configuration
            $recipient = 'kontakt@mirkanpolat.com';
            $subject = 'Contact From ' . $name . ' (' . $email . ')';
            $body = "Name: " . htmlspecialchars($name) . "<br><br>";
            $body .= "Email: " . htmlspecialchars($email) . "<br><br>";
            $body .= "Message:<br>" . nl2br(htmlspecialchars($message));
            
            // Headers
            $headers = array();
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=utf-8';
            $headers[] = 'From: kontakt@mirkanpolat.com';
            $headers[] = 'Reply-To: ' . $email;
            $headers[] = 'X-Mailer: PHP/' . phpversion();
            
            // Send email
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
                'message' => $e->getMessage()
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
