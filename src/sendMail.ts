import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import createMessage from "./createMessage";
import { TFormDTO } from "./types";

const getTransportConfig = (): SMTPTransport.Options => {
  if (process.env.IS_OFFLINE)
    return {
      port: 1025,
    };
  if (
    !process.env.NODEMAILER_HOST ||
    !process.env.NODEMAILER_PORT ||
    !process.env.NODEMAILER_USER ||
    !process.env.NODEMAILER_PASSWORD
  )
    throw new Error("ENV - check nodemailer config");

  return {
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT),
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };
};

export const sendMail = (formData: TFormDTO) => {
  const transport = nodemailer.createTransport(getTransportConfig());

  return transport.sendMail(createMessage(formData));
};

export default sendMail;
