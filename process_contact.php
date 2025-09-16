<?php
// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

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
    $recaptcha_secret = "6LeyQsQrAAAAAMv3ejiuEqC3WL2BdKMmi9EI1owN";  // Replace with your secret key
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
            $mail->Host = 'smtp.gmail.com';  // Replace with your SMTP host
            $mail->SMTPAuth = true;
            $mail->Username = 'krishnaaakimtani@gmail.com';  // Replace with your email
            $mail->Password = 'glpjuyabmbmnjfak';  // Replace with your email password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            
            // Recipients
            $mail->setFrom($email, $name);
            $mail->addAddress('info@sunrise-marine.com');  // Replace with recipient email
            
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
                        