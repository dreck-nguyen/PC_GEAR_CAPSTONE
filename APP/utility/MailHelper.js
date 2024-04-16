import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const email = process.env.FEATURE_MAIL;
const pass = process.env.FEATURE_PASSWORD;

export const orderPlaceMessage = `
<p>Dear [Customer Name],</p>
<p>Thank you for placing an order with <strong>PC-Geared</strong>. We appreciate you shopping with us!</p>
<p><strong>Order Details:</strong></p>
<ul>
  <li>Order Number: [Order Number]</li>
  <li>Date: [Order Date]</li>
  <li>Total Amount: [Total Amount]</li>
  <li>Total Item: [Total Item]</li>
</ul>
<p>If you have any questions or concerns regarding your order, feel free to contact us by <a href="https://www.facebook.com/computergeared">Facebook page</a>.</p>
<p>Regards,<br/>PC-Geared</p>`;

export const orderUpdate = `<p>Dear [Customer Name],</p>
<p>We wanted to inform you that there has been an update on your order with <strong>PC-Geared</strong>.</p>
<p><strong>Order Details:</strong></p>
<ul>
  <li>Order Number: [Order Number]</li>
  <li>Status: [New Order Status]</li>
  <li>Update: [Brief Description of Update]</li>
  <li>Update By : [Staff Name] - [Staff Mail]</li>
</ul>
<p>If you have any questions or need further assistance, please don't hesitate to contact us by <a href="https://www.facebook.com/computergeared">Facebook page</a>.</p>
<p>Regards,<br/>PC-Geared</p>`;

export const paymentConfirm = `<p>Dear [Customer Name],</p>
<p>We're pleased to inform you that the payment for your order with <strong>PC-Geared</strong> has been successfully processed.</p>
<p><strong>Order Details:</strong></p>
<ul>
  <li>Order Number: [Order Number]</li>
  <li>Total Amount: [Total Amount]</li>
  <li>Payment Method: [Payment Method]</li>
  <li>Payment Status: [Payment Status]</li>
</ul>
<p>Thank you for trusting us with your purchase. If you have any questions or need assistance, feel free to reach out to us by <a href="https://www.facebook.com/computergeared">Facebook page</a>.</p>
<p>Regards,<br/>PC-Geared</p>`;

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass,
  },
});

// Message object
const mailOptions = {
  to: 'hduy01012000@gmail.com',
  text: 'Hello, this is a test email!',
};

export async function sendMail(mailOptions) {
  try {
    // Send mail
    mailOptions.from = email;
    mailOptions.subject = `THIS IS AUTO MAIL. PLEASE DO NOT REPLY`;
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
export default transporter;
