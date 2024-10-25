<?php
// Set the recipient email address
$to = 'shahidhasan785@gmail.com'; // Replace this with your actual email address

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize form inputs
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $contact = filter_var(trim($_POST["contact"]), FILTER_SANITIZE_STRING); // Optional field
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Validate the email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo "All required fields must be filled out.";
        exit;
    }

    // Create the email subject and body
    $subject = "Contact Form Submission from $name";
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    if (!empty($contact)) {
        $email_body .= "Contact: $contact\n";
    }
    $email_body .= "Message:\n$message\n";

    // Set email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $email_body, $headers)) {
        echo "Thank you for your message. It has been sent.";
    } else {
        echo "There was a problem sending your message. Please try again later.";
    }
} else {
    // Not a POST request
    echo "Invalid request.";
}

