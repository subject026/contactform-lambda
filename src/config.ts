import { StatusCodes } from "http-status-codes";
import { HttpError } from "./errors";

type TDevTransport = {
  port: number;
};

type TProdTransport = {};

class Config {
  public Transport;
  public NODEMAILER_HOST: string | null;
  public NODEMAILER_PORT: number | null;
  public NODEMAILER_USER: string | null;
  public NODEMAILER_PASSWORD: string | null;

  public RECEIVER_EMAIL: string | null;
  public FROM_EMAIL: string | null;
  public ADMIN_EMAIL: string | null;

  constructor() {
    // if (
    //   !process.env.NODEMAILER_HOST ||
    //   !process.env.NODEMAILER_PORT ||
    //   !process.env.NODEMAILER_USER ||
    //   !process.env.NODEMAILER_PASSWORD ||
    //   !process.env.RECEIVER_EMAIL ||
    //   !process.env.FROM_EMAIL
    // )
    //   throw new HttpError({
    //     statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    //     message: "internal server error!",
    //   });

    this.NODEMAILER_HOST = process.env.NODEMAILER_HOST || null;
    this.NODEMAILER_PORT = process.env.NODEMAILER_PORT
      ? parseInt(process.env.NODEMAILER_PORT)
      : null;
    this.NODEMAILER_USER = process.env.NODEMAILER_USER || null;
    this.NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD || null;

    if (process.env.IS_OFFLINE) {
      this.RECEIVER_EMAIL = "test@email.com";
      this.FROM_EMAIL = "contactform@email.com";
      this.ADMIN_EMAIL = "admin@email.com";
    } else {
      this.RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || null;
      this.FROM_EMAIL = process.env.FROM_EMAIL || null;
      this.ADMIN_EMAIL = process.env.ADMIN_EMAIL || null;
    }
  }

  getTransport() {
    if (process.env.IS_OFFLINE)
      return {
        port: 1025,
      };
    return {
      host: this.NODEMAILER_HOST,
      port: this.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: this.NODEMAILER_USER,
        pass: this.NODEMAILER_PASSWORD,
      },
    };
  }
}

export const getConfig = (() => {
  let config;
  return () => {
    if (!config) config = new Config();
    return config;
  };
})();
