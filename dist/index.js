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
const index_1 = __importDefault(require("./routes/index"));
const File_1 = require("./utils/File");
const app = (0, express_1.default)();
const port = 3000; // Default port
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Use routes
app.use('/api', index_1.default);
// Start server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    // Create thumbnails folder if it doesn't exist
    yield (0, File_1.createThumbnailsFolder)();
    console.log(`App listening on port ${port}`);
}));
exports.default = app;
