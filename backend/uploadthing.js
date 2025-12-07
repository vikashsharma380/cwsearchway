import { createUploadthing, createRouteHandler } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  fileUpload: f({
    "image/*": {
      maxFileCount: 1,
      maxFileSize: "2MB",
    },
    "application/pdf": {
      maxFileCount: 1,
      maxFileSize: "10MB",
    },
  }).onUploadComplete(({ file }) => {
    console.log("Uploaded File:", file.url);
    return { url: file.url };
  }),
};

export const handler = createRouteHandler({
  router: uploadRouter,
});
