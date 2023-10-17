module.exports.emailBody = name => {
  // Email Body text
  const text = `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
      <h1 style="text-align: center; margin-bottom: 30px; color: #d89b9b;">Thank You for Shopping with Elite Fashion!</h1>
      <p style="font-size: 18px;">Dear ${name},</p>
      <p style="font-size: 18px;">We wanted to take a moment to thank you for your recent purchase with Elite Fashion. We appreciate doing business with you and we hope that you are happy with your order.</p>
      <p style="font-size: 18px;">If you have any questions or concerns about your purchase, please don't hesitate to contact us at support@elitefashion.com.</p>
      <p style="font-size: 18px;">Thank you again for shopping with us. We hope to see you again soon!</p>
      </div>
      </div>`
  return text
}

module.exports.forgetPasswordEmailBody = url => {
  const text = `
		 <div style="background-color: #ffffff; padding: 10px;">
			<h1 style="margin-bottom: 15px; color: #212529;">Reset Your Password</h1>
			<p style="font-size: 18px;">Click the link below to reset your password:</p>
			<a style="display: inline-block;
			  padding: 10px 20px;
			  background-color: #3f7fb8;
			  color: #fff;
			  text-decoration: none;
			  border-radius: 5px;" href=${url}>Reset Password</a>
			<p>If you did not request a password reset, please ignore this email.</p>
		 </div>
	  `
  return text
}
