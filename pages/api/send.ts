import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "../../components/homepage/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { user_name = '', user_email = '', message = '' } = req.body as {user_name: string, user_email: string, message: string}
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["pepireyesspa2021@gmail.com"],
      subject: "Formulario de contacto Pepireyes",
      react: EmailTemplate({user_name, user_email, message  }),
      text: "Formulario de contacto Pepireyes",
    });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
