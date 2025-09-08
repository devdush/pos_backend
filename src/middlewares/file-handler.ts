import fileUpload from "express-fileupload";
export default fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
