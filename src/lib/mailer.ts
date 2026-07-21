import nodemailer from "nodemailer";

export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendEnquiryEmails(enquiry: {
  fullName: string;
  email: string;
  whatsapp: string;
  destination?: string | null;
  hotelCategory?: string | null;
  checkIn?: Date | null;
  checkOut?: Date | null;
  message?: string | null;
}) {
  const transporter = getTransporter();
  const from = process.env.MAIL_FROM;
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;

  // Notify the admin team
  await transporter.sendMail({
    from,
    to: adminEmail,
    subject: `New Quote Request — ${enquiry.fullName}`,
    text: [
      `Name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      `WhatsApp: ${enquiry.whatsapp}`,
      `Destination: ${enquiry.destination ?? "-"}`,
      `Hotel category: ${enquiry.hotelCategory ?? "-"}`,
      `Check-in: ${enquiry.checkIn ?? "-"}`,
      `Check-out: ${enquiry.checkOut ?? "-"}`,
      `Message: ${enquiry.message ?? "-"}`,
    ].join("\n"),
  });

  // Confirmation to the customer
  await transporter.sendMail({
    from,
    to: enquiry.email,
    subject: "We've received your enquiry — AA Group Travels",
    text: `Assalamu Alaikum ${enquiry.fullName},\n\nThank you for your enquiry. Our team will respond shortly.\n\nAA Group Travels`,
  });
}
