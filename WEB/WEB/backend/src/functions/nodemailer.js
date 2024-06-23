const nodemailer = require("nodemailer");
const crypto = require("crypto");


// In-memory storage for verification codes (for demonstration purposes)
const verificationCodes = {};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME, // replace with your Gmail address
    pass: process.env.EMAIL_PASSWORD, // replace with your App Password or actual password
  },
});

// Function to send a verification email
function sendVerificationEmail(email, verificationCode) {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // replace with your Gmail address
    to: email,
    subject: "Account Verification",
    text: `Your verification code is: ${verificationCode}\n
            The code is only valid for 5 minutes.
            
            If you didn't request this code, you can safely ignore this email.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    callback(null, "Verification email sent successfully");
  });
}

function sendResetPasswordEmail(email, verificationCode) {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME, // replace with your Gmail address
    to: email,
    subject: "Reset Password",
    text: `Your reset code is: ${verificationCode}\n
            The code is only valid for 5 minutes.
            
            If you didn't request this code, you can safely ignore this email.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    callback(null, "Reset password email sent successfully");
  });
}

// Function to handle user signup
function handleSignup(email) {
  // Generate a random verification code
  const verificationCode = crypto.randomBytes(3).toString("hex"); // Adjust the length of the code as needed

   // Store the verification code and expiration timestamp in memory
   const expirationTime = Date.now() + 5 * 60 * 1000; //  hours in milliseconds
   verificationCodes[email] = { code: verificationCode, expiration: expirationTime };
 
   // Send the verification email
   return sendVerificationEmail(email, verificationCode);
}

// Function to check if the verification code is still available
function isCodeAvailable(email) {
    const storedCode = verificationCodes[email];
  
    if (storedCode && !storedCode.used && Date.now() < storedCode.expiration) {
      // Code is still valid and available
      return true;
    } else {
      // Code is either used, expired, or doesn't exist
      return false;
    }
  }

// Function to handle code verification
function verifyCode(email, code) {
  const storedCode = verificationCodes[email];

  if (storedCode && storedCode.code === code && Date.now() < storedCode.expiration) {
      // Code is correct, perform account activation or other actions as needed
      return true;
  } else {
      // Code is incorrect, expired, or doesn't exist
      return false;
  }
}

function handleForgotPassword(email) {
  // Generate a random verification code
  const verificationCode = crypto.randomBytes(6).toString("hex"); // Adjust the length of the code as needed

  // Store the verification code and expiration timestamp in memory
  const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes in milliseconds
  verificationCodes[email] = { code: verificationCode, expiration: expirationTime };

  // Send the verification email
  return sendResetPasswordEmail(email, verificationCode);
}

module.exports = {handleSignup, verifyCode, handleForgotPassword};
