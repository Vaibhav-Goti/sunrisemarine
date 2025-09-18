<?php
// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require 'vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
$dotenv->required(['SMTP_HOST', 'SMTP_USERNAME', 'SMTP_PASSWORD', 'RECAPTCHA_SECRET_KEY']);

// Function to clean input data
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Verify reCAPTCHA
    $recaptcha_secret = $_ENV['RECAPTCHA_SECRET_KEY'];
    $recaptcha_response = $_POST['g-recaptcha-response'];
    
    $verify_url = "https://www.google.com/recaptcha/api/siteverify";
    $verify_data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($verify_data)
        ]
    ];
    
    $context = stream_context_create($options);
    $verify_response = file_get_contents($verify_url, false, $context);
    $captcha_success = json_decode($verify_response);
    
    if ($captcha_success->success) {
        // Get form data and clean it
        $name = clean_input($_POST['name']);
        $email = clean_input($_POST['email']);
        $message = clean_input($_POST['message']);
        
        // Create a new PHPMailer instance
        $mail = new PHPMailer(true);
        
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = $_ENV['SMTP_HOST'];
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['SMTP_USERNAME'];
            $mail->Password = $_ENV['SMTP_PASSWORD'];
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;
            
            // Recipients
            $mail->setFrom($_ENV['SMTP_USERNAME'], 'Sunrise Marine');
            $mail->addAddress($_ENV['SMTP_USERNAME']);
            $mail->addReplyTo($email, $name);
            
            // Content
            $mail->isHTML(true);
            $mail->Subject = 'New Contact Form Submission';
            $mail->Body = "
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Message:</strong></p>
                <p>{$message}</p>
            ";
            
            $mail->send();
            
            // Send confirmation email to the user
            try {
                $confirm = new PHPMailer(true);
                $confirm->isSMTP();
                $confirm->Host = $_ENV['SMTP_HOST'];
                $confirm->SMTPAuth = true;
                $confirm->Username = $_ENV['SMTP_USERNAME'];
                $confirm->Password = $_ENV['SMTP_PASSWORD'];
                $confirm->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $confirm->Port = 465;

                $confirm->setFrom($_ENV['SMTP_USERNAME'], 'Sunrise Marine');
                $confirm->addAddress($email, $name);
                
                $confirm->isHTML(true);
                $confirm->Subject = 'Thank you for contacting Sunrise Marine';
                $confirm->Body = "
                    <p>Dear {$name},</p>
                    <p>Thank you for reaching out to Sunrise Marine. We have received your message and our team will get back to you shortly.</p>
                    <p><strong>Your message:</strong></p>
                    <p>" . nl2br($message) . "</p>
                    <p>Best regards,<br>Sunrise Marine Enterprise</p>
                ";
                $confirm->AltBody = "Dear {$name},\n\nThank you for reaching out to Sunrise Marine. We have received your message and our team will get back to you shortly.\n\nYour message:\n{$message}\n\nBest regards,\nSunrise Marine Enterprise";
                
                $confirm->send();
            } catch (Exception $e) {
                // Ignore confirmation email errors to not affect user flow
            }
            header('Location: contact.html?status=success');
            exit();
            
        } catch (Exception $e) {
            header('Location: contact.html?status=error');
            exit();
        }
    } else {
        header('Location: contact.html?status=captcha_failed');
        exit();
    }
} else {
    // If someone tries to access this file directly
    header('Location: contact.html');
    exit();
}
?>
                        