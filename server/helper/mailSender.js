const config = require("../config/index");
const nodeMailer = require("nodemailer");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(config.GOOGLE_API_CLIENT_ID, config.GOOGLE_API_CLIENT_SECRET, config.GOOGLE_REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: config.GOOGLE_API_REFRESH_TOKEN });

const mailSender = async (email, name) => {
   console.log(email, name)
   try {
      const accessToken = await oauth2Client.getAccessToken()
      const transport = nodeMailer.createTransport({
         service: "gmail",
         auth: {
            type: "OAuth2",
            user: "ritu198928@gmail.com",
            clientId: config.GOOGLE_API_CLIENT_ID,
            clientSecret: config.GOOGLE_API_CLIENT_SECRET,
            refreshToken: config.GOOGLE_API_REFRESH_TOKEN,
            accessToken: accessToken
         }
      });

      const mailOptions = {
         from: "Elite Fashion <ritu198928@gmail.com>",
         to: email,
         subject: "Thank You for Shopping with Elite Fashion",
         html: `
           <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
             <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
               <h1 style="text-align: center; margin-bottom: 30px; color: #d89b9b;">Thank You for Shopping with Elite Fashion!</h1>
               <p style="font-size: 18px;">Dear ${name},</p>
               <p style="font-size: 18px;">We wanted to take a moment to thank you for your recent purchase with Elite Fashion. We appreciate doing business with you and we hope that you are happy with your order.</p>
               <p style="font-size: 18px;">If you have any questions or concerns about your purchase, please don't hesitate to contact us at support@elitefashion.com.</p>
               <p style="font-size: 18px;">Thank you again for shopping with us. We hope to see you again soon!</p>
             </div>
           </div>
         `
      };

      const result = await transport.sendMail(mailOptions);
      console.log(result, "RESULT")
      return result;
   } catch (err) {
      console.log(err, "EMAIL-SENDER-ERROR")
   }
}

module.exports = mailSender;