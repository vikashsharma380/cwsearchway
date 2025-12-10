import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

// AWS SDK v2 config
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "eu-north-1", // Stockholm region
});

// Create S3 client (NO endpoint override)
const s3 = new AWS.S3();

// Multer Upload Config
export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});
