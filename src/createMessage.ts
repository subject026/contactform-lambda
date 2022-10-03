import Mail from "nodemailer/lib/mailer";
import { getConfig } from "./config";
import { TFormDTO } from "./types";

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
  const config = getConfig();

  const message = {
    from: config.FROM_EMAIL,
    to: config.RECEIVER_EMAIL,
    subject: "lewisandy.dev - message received",
    text:
      "Message Received\n\n" +
      Object.keys(formData)
        .map((key) => {
          return `${key} - ${formData[key]}`;
        })
        .join("\n"),
    html,
  };

  return message;
};

export default createMessage;
