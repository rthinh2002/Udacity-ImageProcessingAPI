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
const express_1 = __importDefault(require("express"));
const File_1 = require("../../utils/File");
const images = express_1.default.Router();
const checkValidQuery = ({ filename, width, height }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!filename)
        return 'Filename is required';
    if (!width)
        return 'Width is required';
    if (!height)
        return 'Height is required';
    if (typeof filename !== 'string')
        return 'Filename must be a string';
    if ((yield (0, File_1.checkIfFileExists)(filename)) === false)
        return 'Image not found. Please try again';
    const widthNumber = parseInt(width || '0');
    const heightNumber = parseInt(height || '0');
    if (Number.isNaN(widthNumber) || widthNumber < 1)
        return 'Please enter a valid width';
    if (Number.isNaN(heightNumber) || heightNumber < 1)
        return 'Please enter a valid height';
    return null;
});
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename, width, height } = req.query;
        const validateMessage = yield checkValidQuery(req.query);
        if (validateMessage !== null) {
            res.status(400).json({ error: validateMessage });
            return;
        }
        const thumbnailExists = yield (0, File_1.checkIfThumbnailExists)(filename, width, height);
        if (thumbnailExists) {
            // If thumbnail exists render that file
        }
        else {
            // If not create a new file in thumbnail and render that file
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = images;
