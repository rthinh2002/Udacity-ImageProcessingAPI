"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teacher_1 = __importDefault(require("./api/teacher"));
const student_1 = __importDefault(require("./api/student"));
const image_1 = __importDefault(require("./api/image"));
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('API');
});
routes.use('/images', image_1.default);
routes.use('/teacher', teacher_1.default);
routes.use('/student', student_1.default);
exports.default = routes;
