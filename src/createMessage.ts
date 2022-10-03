import Mail from "nodemailer/lib/mailer";
import { TFormDTO } from "./types";

const getReceiverEmail = (): string => {
  if (process.env.IS_OFFLINE) return "receiver@sender.com";
  if (!process.env.RECEIVER_EMAIL)
    throw new Error("ENV - receiver email not set");
  return process.env.RECEIVER_EMAIL;
};

const createMessage = (formData: TFormDTO): Mail.Options => {
  const html = `
  <style>  
    * {
      font-family: sans-serif;
      color: #202020;
    }    
    h5 {
      font-size: 1.4rem;
      margin: 0;
      font-weight: bold;
    }
    p {
      margin-top: 1rem;
    }
    .container {
      padding: 1rem;
    }
    .field {
      margin-top: 2rem;
    }
  </style>
  <div class="container">
  <h5>Contact Form Message Received</h5>
    ${Object.keys(formData)
      .map((key) => {
        return `<div class="field">
        <p><strong>${key}</strong></p>
        <p>${formData[key]}</p>
        </div>
        `;
      })
      .join("")}
      </div>
    `;

  const message = {
    from: "contactform@lewisandy.dev",
    to: getReceiverEmail(),
    subject: "lewisandy.dev - message received",
    text: `Message Received
    
    ${Object.keys(formData)
      .map((key) => {
        return `${key}:
        ${formData[key]}
        
        `;
      })
      .join("")}`,
    html,
  };

  return message;
};

export default createMessage;
