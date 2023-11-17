import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dfpyzns33",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return uploadFile(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const saveFile = async (file: any): Promise<string> => {
  console.log("donde se encuentra el archivo", file.filepath);

  const { secure_url } = await cloudinary.uploader.upload(file.filepath);

  console.log("secure", secure_url);
  return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      console.log({ err, fields, files });

      if (err) {
        return reject(err);
      }
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      console.log("file api", files.file);
      console.log("formidable.File  api", files);
      const filePath = await saveFile(file as any);
      resolve(filePath);
    });
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const imageUrl = await parseFiles(req);
  console.log(imageUrl);

  //   return res.status(200).json({ message: "image subida" });
  return res.status(200).json({ message: imageUrl });
};
