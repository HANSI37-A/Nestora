const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    await resend.emails.send({
      from: 'Nestora Atelier <onboarding@resend.dev>', 
      to: process.env.CONTACT_RECEIVER, 
      subject: `New Atelier Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #F9F7F2;">
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Inquiry sent successfully.' });
  } catch (error) {
    console.error('API Email Error:', error);
    return res.status(500).json({ message: 'Failed to process inquiry.' });
  }
});

module.exports = router;