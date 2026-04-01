exports.resetPasswordTemplate = (name, resetUrl) => {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Hi ${name},</h2>
      <p>You requested to reset your password.</p>
      <a href="${resetUrl}" 
         style="background:#007bff;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">
         Reset Password
      </a>
      <p>This link will expire in 1 hour.</p>
    </div>
  `;
};

exports.welcomeTemplate = (name) => {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Welcome ${name} 🎉</h2>
      <p>Your account has been successfully created.</p>
      <p>Start using HealthChecker AI now!</p>
    </div>
  `;
};
