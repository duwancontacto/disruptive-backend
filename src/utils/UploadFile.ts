import { v2 as cloudinary } from "cloudinary";
import { Readable, Stream } from "stream";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface FileCloudinary {
  url: string;
  format: string;
}

export const UploadFile = async (file: any): Promise<FileCloudinary> => {
  const fileUuid = uuidv4();
  const fileStream = new Readable();
  fileStream.push(file.data);
  fileStream.push(null);

  return new Promise((resolve, reject) => {
    const cloudinaryStream = cloudinary.uploader.upload_stream(
      { public_id: fileUuid },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result?.url || "",
            format: result?.format || "",
          });
        }
      }
    );

    fileStream.pipe(cloudinaryStream);
  });
};
