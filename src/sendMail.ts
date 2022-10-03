import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import { getConfig } from "./config";
import createMessage from "./createMessage";
import { TFormDTO } from "./types";

export const sendMail = async (formData: TFormDTO) => {
  try {
    const transportConfig = getConfig().getTransport();
    const transport = nodemailer.createTransport(transportConfig);

    await transport.sendMail(createMessage(formData));

    return {
      statusCode: StatusCodes.OK,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "message sent",
      }),
    };
  } catch (err) {
    console.log({ err });
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "failed to send mail",
      }),
    };
  }
};

export default sendMail;
