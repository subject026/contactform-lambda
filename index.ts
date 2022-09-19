import z from "zod";

const FormDTO = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

// type TFormDTO = z.infer<typeof FormDTO>;

export const handler = async (event: any) => {
  try {
    const formData = FormDTO.parse(event);
    console.log("validated formdata: ", formData);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "nicccce" }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 418,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: err }),
    };
  }
};
