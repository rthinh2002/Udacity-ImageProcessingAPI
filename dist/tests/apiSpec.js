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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test responses from API', () => {
    describe('endpoint: /', () => {
        it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /api/images', () => {
        it('Return error because no query were pass', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images');
            expect(response.status).toBe(400);
        }));
        it('Return error because no height query were pass', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=encenadaport&width=200');
            expect(response.status).toBe(400);
        }));
        it('Return error because no width query were pass', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=encenadaport&height=200');
            expect(response.status).toBe(400);
        }));
        it('Return error because no filename query were pass', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?width=200&height=200');
            expect(response.status).toBe(400);
        }));
        it('Return error because filename query were pass but no image found', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=test&width=200&height=200');
            expect(response.status).toBe(400);
        }));
        it('Return error because width query were pass but not a number', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=encenadaport&width=abc&height=200');
            expect(response.status).toBe(400);
        }));
        it('Return error because height query were pass but not a number', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=encenadaport&width=200&height=abc');
            expect(response.status).toBe(400);
        }));
        it('Return error because width query were pass but not a number', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=encenadaport&width=abc&height=200');
            expect(response.status).toBe(400);
        }));
        it('Return image', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=encenadaport&width=300&height=200');
            expect(response.status).toBe(200);
        }));
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const thumbnailPath = path_1.default.resolve(__dirname, '..', '..', 'assets', 'thumbnails', 'encenadaport-300x200.jpg');
    try {
        yield fs_1.promises.access(thumbnailPath);
        yield fs_1.promises.unlink(thumbnailPath);
    }
    catch (error) {
        console.log(error);
    }
}));
