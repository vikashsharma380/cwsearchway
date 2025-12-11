import multer from "multer";

const storage = multer.memoryStorage(); // buffer me store karega
const upload = multer({ storage });

export default upload;
