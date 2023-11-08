"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = exports.checkIfThumbnailExists = exports.createThumbnailsFolder = exports.checkIfFileExists = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const ImageProcessing_1 = __importDefault(require("../service/ImageProcessing"));
const checkIfFileExists = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputFileName = path_1.default.resolve(__dirname, '..', '..', 'assets', 'images', fileName.concat('.jpg'));
        yield fs_1.promises.access(inputFileName);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.checkIfFileExists = checkIfFileExists;
const createThumbnailsFolder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thumbnailsFolder = path_1.default.resolve(__dirname, '..', '..', 'assets', 'thumbnails');
        yield fs_1.promises.mkdir(thumbnailsFolder);
    }
    catch (error) {
        return;
    }
});
exports.createThumbnailsFolder = createThumbnailsFolder;
const checkIfThumbnailExists = (fileName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thumbnailFileName = `${fileName}-${width}x${height}.jpg`;
        const thumbnailPath = path_1.default.resolve(__dirname, '..', '..', 'assets', 'thumbnails', thumbnailFileName);
        yield fs_1.promises.access(thumbnailPath);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.checkIfThumbnailExists = checkIfThumbnailExists;
const createImage = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, width, height } = query;
        const inputFileName = path_1.default.resolve(__dirname, '..', '..', 'assets', 'images', filename.concat('.jpg'));
        const outputFileName = path_1.default.resolve(__dirname, '..', '..', 'assets', 'thumbnails', `${filename}-${width}x${height}.jpg`);
        const error = yield (0, ImageProcessing_1.default)({
            inputFileName,
            outputFileName,
            width: parseInt(width),
            height: parseInt(height)
        });
        return error;
    }
    catch (error) {
        return 'Something went wrong. Please try again later.';
    }
});
exports.createImage = createImage;
