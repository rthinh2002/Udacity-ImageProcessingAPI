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
const ImageProcessing_1 = __importDefault(require("../service/ImageProcessing"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
describe('Test Image Processing Service', () => {
    const inputFileName = path_1.default.resolve(__dirname, '..', '..', 'assets', 'images', 'palmtunnel.jpg');
    const outputFileName = path_1.default.resolve(__dirname, '..', '..', 'assets', 'thumbnails', 'palmtunnel-400x200.jpg');
    it('Should create a thumbnail', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, ImageProcessing_1.default)({
            inputFileName,
            outputFileName,
            width: 400,
            height: 200
        });
        expect(error).toBeNull();
    }));
    it('Should return error because of invalid input file', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, ImageProcessing_1.default)({
            inputFileName: 'invalid.jpg',
            outputFileName,
            width: 400,
            height: 200
        });
        expect(error).not.toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const thumbnailPath = path_1.default.resolve(__dirname, '..', '..', 'assets', 'thumbnails', 'palmtunnel-400x200.jpg');
    try {
        yield fs_1.promises.access(thumbnailPath);
        fs_1.promises.unlink(thumbnailPath);
    }
    catch (error) {
        console.log(error);
    }
}));
