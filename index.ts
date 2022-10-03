import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { StatusCodes } from "http-status-codes";
import sendMail from "./src/sendMail";
import { FormDTO } from "./src/types";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const formData = FormDTO.parse(JSON.parse(event.body || ""));

    return await sendMail(formData);
  } catch (err) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: err }),
    };
  }
};
