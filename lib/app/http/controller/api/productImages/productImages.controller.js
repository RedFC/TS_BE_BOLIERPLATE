"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImages = void 0;
const fs = __importStar(require("fs"));
const cloudinary_1 = require("../../../../constants/cloudinary");
const error_service_1 = require("../../../services/error.service");
const image_service_1 = require("../../../services/image.service");
class ProductImages {
    uploader(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { files } = req;
                const image = (path, name) => __awaiter(this, void 0, void 0, function* () {
                    const cloudinary = new cloudinary_1.Cloudinary();
                    return yield cloudinary.uploads(path, `${name}`);
                });
                if (!files) {
                    let images = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                        let pathSplit = file.path.split('\\')[2].split('.').slice(0, -1).join('.');
                        const imgURL = yield image(file.path, pathSplit);
                        fs.unlink(file.path, () => { console.log(`Deleted ${file.path}`); });
                        return imgURL;
                    })));
                    const imageService = new image_service_1.ImageService();
                    let imagesArray = images.map(i => { return { cloudinaryId: i.id, path: i.url }; });
                    let DBImages = yield imageService.create(imagesArray);
                    return imagesArray;
                }
                else {
                    error_service_1.ErrorService.handler(res, 400, { success: false, msg: "File Not Found", status: 400 });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
}
exports.ProductImages = ProductImages;
//# sourceMappingURL=productImages.controller.js.map