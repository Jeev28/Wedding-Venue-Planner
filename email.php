<?php
        $emailErrorMsg = "";
        $emailSuccessMsg = "";
        $user_email = "";
        //filter and sanitise email input 
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            $user_email = $_POST["email"];
            if (empty($user_email)){
                $emailErrorMsg = "Email address cannot be empty";
                echo json_encode(['error' => $emailErrorMsg]);
                exit();
            } elseif (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
                $emailErrorMsg = "Enter a valid email";
                echo json_encode(['error' => $emailErrorMsg]);
                exit();
            } else {
                $emailSuccessMsg = "Thank you! We'll find your perfect venue soon!";
                echo json_encode(['success' => $emailSuccessMsg]);
                exit();
            }
        }
?>