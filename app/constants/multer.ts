import Multer from "multer";

const fileStorage = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); // for folder name
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`
        );
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"||
        file.mimetype === "video/mp4"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);

    }
};
export const upload = Multer({ storage: fileStorage, fileFilter: fileFilter });