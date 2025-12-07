import { createUploadthing, createRouteHandler } from "uploadthing/express";
const f = createUploadthing({
  token: process.env.UPLOADTHING_TOKEN,
});


export const uploadRouter = {
  fileUpload: f({
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
  }).onUploadComplete(({ file }) => {
    console.log("Uploaded File:", file.url);
    return { url: file.url };
  }),
};

export const handler = createRouteHandler({
  router: uploadRouter,
});
