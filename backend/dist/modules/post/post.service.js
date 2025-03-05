"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let PostService = class PostService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async create(createPostDto, userId) {
        return this.databaseService.post.create({
            data: {
                ...createPostDto,
                author: { connect: { id: userId } },
            },
        });
    }
    async findAll() {
        return this.databaseService.post.findMany({
            include: { author: true, comments: true, likes: true },
        });
    }
    async findOne(id) {
        return this.databaseService.post.findUnique({ where: { id } });
    }
    async update(id, updatePostDto) {
        return this.databaseService.post.update({
            where: { id },
            data: updatePostDto,
        });
    }
    async remove(id) {
        return this.databaseService.post.delete({ where: { id } });
    }
    async uploadPostImages(files) {
        console.log(files);
        return;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PostService);
//# sourceMappingURL=post.service.js.map