import { createUploadthing, createRouteHandler } from "uploadthing/express";
const f = createUploadthing({
  token: process.env.UPLOADTHING_TOKEN,
});

export const uploadRouter = {
  // Signature upload (only images)
  signatureUpload: f({
    signature: { maxFileCount: 1, maxFileSize: "2MB", allowedFileTypes: ["image/jpeg", "image/png", "image/jpg", "image/webp"] },
  }).onUploadComplete(({ file }) => {
    console.log("Signature Uploaded:", file.url);
    return { url: file.url };
  }),

  // Resume upload (only PDF)
  resumeUpload: f({
    "application/pdf": { maxFileCount: 1, maxFileSize: "10MB" }
  }).onUploadComplete(({ file }) => {
    console.log("Resume Uploaded:", file.url);
    return { url: file.url };
  }),
};

export const handler = createRouteHandler({
  router: uploadRouter,
});
