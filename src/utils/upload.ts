import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";
import s3Client from "./s3.config";
import dotenv from "dotenv";
dotenv.config();
export const uploadToS3 = async (
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> => {
  const stream = Readable.from(buffer);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `profilePictures/${Date.now()}-${fileName}`,
      Body: stream,
      ContentType: mimeType,
      ACL: "public-read",
    },
  });

  const result = await upload.done();
  // @ts-ignore
  return result.Location; 
};
