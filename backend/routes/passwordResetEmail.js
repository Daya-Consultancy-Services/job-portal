exports.passwordResetEmail = (email, resetLink) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Reset Your Password</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }

            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }

            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .reset-button {
                display: inline-block;
                padding: 12px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }

            .reset-button:hover {
                background-color: #0056b3;
            }

            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <a href="http://localhost:3000/resetpassword"><img class="logo" 
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="OneCareer Logo"></a>
            <div class="message">Reset Your Password</div>
            <div class="body">
                <p>Hey,</p>
                <p>We received a request to reset the password for the account associated with <strong>${email}</strong>.</p>
                <p>Click the button below to reset your password:</p>
                <a class="reset-button" href="${resetLink}">Reset Password</a>
                <p>If you didn't request this password change, please ignore this email or contact support.</p>
            </div>
            <div class="support">
                If you need further assistance, feel free to reach out to us at
                <a href="mailto:support@onecareer.com">support@onecareer.com</a>.
            </div>
        </div>
    </body>
    
    </html>`;
};
