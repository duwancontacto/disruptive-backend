import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import mustache from "mustache";
dotenv.config();

interface Props {
  email: string;
  subject: string;
  html: string;
  title: string;
}

async function sendPurchaseMail({
  email,
  payload,
}: {
  email: string;
  payload: any;
}) {
  const template = fs
    .readFileSync(path.join(__dirname, "./Templates/purchase2.html"))
    .toString();

  let html = mustache.render(template, payload);
  let subject = "Compra realizada - Hausler";

  await sendMail({
    email,
    subject,
    html,
    title: "Compra realizada - Hausler",
  });
}

async function sendAdminMail({ payload }: { payload: any }) {
  const template = fs
    .readFileSync(path.join(__dirname, "./Templates/admin.html"))
    .toString();

  let html = mustache.render(template, payload);
  let subject = "Compra realizada - Hausler";

  await sendMail({
    email: process.env.NODEMAILER_ADMIN_EMAIL || "",
    subject,
    html,
    title: "Compra realizada - Hausler",
  });
}

async function sendMail({ email, subject, html, title }: Props) {
  try {
    const transporter = await nodemailer.createTransport({
      service: "office365",
      /*  host: "smtp.gmail.com",
      port: 465,
      secure: true,   */
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    /*    const transporter = await nodemailer.createTransport({
      service: "office365",
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });
 */
    await transporter
      .verify()
      .then((result: any) => {
        console.log("Ready to send email", result);
      })
      .catch((err: any) => {
        console.log(err);
      });

    return await transporter.sendMail({
      from: `${title}`,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.log("Error sending email", error);
  }
}

export { sendMail, sendPurchaseMail, sendAdminMail };
