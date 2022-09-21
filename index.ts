import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import z from "zod";

const FormDTO = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

// type TFormDTO = z.infer<typeof FormDTO>;

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = event.body ? event.body : "";
    const formData = FormDTO.parse(JSON.parse(body));
    console.log("validated formdata: ", formData);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
      body: JSON.stringify({
        message: "message sent",
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 418,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
      },
      body: JSON.stringify({ error: err }),
    };
  }
};
