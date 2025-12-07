import express from "express";
import { createUploadthing, createRouteHandler } from "uploadthing/express";

const router = express.Router();
const f = createUploadthing();

// SIGNATURE + RESUME CONFIG
export const uploadRouter = {
  resumeUpload: f({
    signature: {
      maxFileCount: 1,
      maxFileSize: "2MB",
      allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
    },
    resume: {
      maxFileCount: 1,
      maxFileSize: "10MB",
      allowedFileTypes: ["application/pdf"],
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Uploaded:", file.url);
    return { url: file.url };
  }),
};

router.use(
  "/upload",
  createRouteHandler({
    router: uploadRouter,
  })
);

export default router;
