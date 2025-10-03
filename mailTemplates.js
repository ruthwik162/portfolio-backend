export const adminMailOptions = (name, email, subject, message) => ({
  from: `"Nagaruthwik ©" <${process.env.EMAIL_USER}>`,
  to: ["ruthwik.merugu@outlook.com", "nagaruthwikmerugu162@gmail.com"],
  subject: `New Contact Form Submission: ${subject}`,
  html: `
  <div style="font-family: Inter, Arial, sans-serif; background:#0f2027; padding:30px; color:#fff;">
    <div style="max-width:600px;margin:auto;background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);padding:25px;border-radius:6px;box-shadow:0 8px 25px rgba(0,0,0,0.5)">
      <h2 style="color:#00c6ff;margin-bottom:10px;">New Message from Portfolio</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> <a href="mailto:${email}" style="color:#4da6ff">${email}</a></p>
      <p><b>Subject:</b> ${subject}</p>
      <p style="margin-top:20px;"><b> Message:</b></p>
      <div style="background:rgba(255,255,255,0.08);padding:15px;border-radius:10px;line-height:1.5;">${message.replace(/\n/g, "<br>")}</div>
      <a href="mailto:${email}" style="display:inline-block;margin-top:20px;padding:12px 22px;background:linear-gradient(135deg,#00c6ff,#0072ff);color:#fff;text-decoration:none;border-radius:10px;">Reply to ${name}</a>
    </div>
  </div>`
});

export const clientMailOptions = (name, email) => ({
  from: `"Nagaruthwik ©" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `Thanks for contacting me, ${name}!`,
  html: `
  <div style="font-family: Inter, Arial, sans-serif; background:#1f1c2c; padding:30px; color:#fff;">
    <div style="max-width:600px;margin:auto;background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);padding:25px;border-radius:6px;box-shadow:0 8px 25px rgba(0,0,0,0.5)">
      <h2 style="-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:22px;margin-bottom:15px;">
        Thank You, ${name}!
      </h2>
      <p>Hi ${name},</p>
      <p>I’ve received your message and I’ll get back to you shortly.  
         Meanwhile, you can explore more of my work below:</p>
      <a href="https://nagaruthwik.vercel.app" style="display:inline-block;margin-top:20px;padding:12px 22px;background:linear-gradient(135deg,#ff6a00,#ee0979);color:#fff;text-decoration:none;border-radius:10px;">🌐 Visit My Portfolio</a>
      <p style="margin-top:25px;font-size:13px;color:#aaa;">This is an automated response from Nagaruthwik ©</p>
    </div>
  </div>`
});
