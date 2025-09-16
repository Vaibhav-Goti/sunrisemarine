<?php
ob_start(); // Start output buffering
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Required environment variables
$dotenv->required(['SMTP_USERNAME', 'SMTP_PASSWORD', 'RECAPTCHA_SECRET_KEY']);

// Configuration
$admin_email = $_ENV['SMTP_USERNAME'];
$app_password = $_ENV['SMTP_PASSWORD'];
$recaptcha_secret = $_ENV['RECAPTCHA_SECRET_KEY'];

// Function to validate reCAPTCHA
function validateRecaptcha($recaptcha_response, $secret_key) {
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secret_key,
        'response' => $recaptcha_response
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $result = json_decode($response);

    return $result->success;
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate reCAPTCHA
    if (!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])) {
        die("Please complete the reCAPTCHA verification.");
    }

    if (!validateRecaptcha($_POST['g-recaptcha-response'], $recaptcha_secret)) {
        die("reCAPTCHA verification failed. Please try again.");
    }

    // Get form data
    $name = $_POST['full_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $product_category = $_POST['product_category'] ?? '';
    $specific_product = $_POST['specific_product'] ?? '';
    $message = $_POST['message'] ?? '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone)) {
        die("Please fill in all required fields.");
    }

    // Prepare email content
    $to = $admin_email;
    $subject = "New Quote Request from $name";
    $email_content = "New quote request received:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Product Category: $product_category\n";
    $email_content .= "Specific Product: $specific_product\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email using PHPMailer
    $mail = new PHPMailer(true); // true enables exceptions

     try {
         // Disable debug output in production
         $mail->SMTPDebug = 0;
         
         // Server settings
         $mail->isSMTP();
         $mail->Host = $_ENV['SMTP_HOST'];
         $mail->SMTPAuth = true;
         $mail->Username = $_ENV['SMTP_USERNAME'];
         $mail->Password = $_ENV['SMTP_PASSWORD'];
         $mail->SMTPSecure = $_ENV['SMTP_ENCRYPTION'];
         $mail->Port = $_ENV['SMTP_PORT'];

        // Recipients
        $mail->setFrom($admin_email, 'Sunrise Marine Quote System');
        $mail->addAddress($email, $name);
        $mail->addReplyTo($admin_email);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Message";
        $mail->Body = "Name: $name<br>";
        $mail->Body .= "Email: $email<br>";
        $mail->Body .= "Message:<br>";
        $mail->Body .= "$message";              
        
        $mail->AltBody = "Name: $name\n";
        $mail->AltBody .= "Email: $email\n";
        $mail->AltBody .= "Message:\n";
        $mail->AltBody .= "$message";
        
        $mail->send();

        // Clear any output and redirect
        ob_end_clean(); // Clean (erase) the output buffer and turn off output buffering
        header("Location: thank-you.html");
        exit();
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo);
        die("Message could not be sent. Mailer Error: " . $mail->ErrorInfo . "<br>Please try again later or contact support.");
    }
}
?>
