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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const swagger_1 = require("@nestjs/swagger");
const creatProduct_dto_1 = require("./dto/creatProduct.dto");
const list_dto_1 = require("./dto/list.dto");
const update_dto_1 = require("./dto/update.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getProduct() {
        return await this.appService.getProduct();
    }
    async getProductbyID(id) {
        return await this.appService.getProductById(id);
    }
    async getlist(listDto) {
        return await this.appService.getlistProduct(listDto);
    }
    async postProduct(creatDTO) {
        return await this.appService.createProduct(creatDTO);
    }
    async histogramDate() {
        return await this.appService.histogramDate();
    }
    async histogram() {
        return await this.appService.histogram();
    }
    async updateProduct(product_id, updateDto) {
        return this.appService.updateProduct(product_id, updateDto);
    }
    async deleteProducr(id) {
        return this.appService.removeProduct(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'get all list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'get product by id' }),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProductbyID", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiOperation)({ summary: 'pagination' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_dto_1.ListDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getlist", null);
__decorate([
    (0, common_1.Post)('creat-product'),
    (0, swagger_1.ApiOperation)({ summary: 'creat product inventory' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creatProduct_dto_1.CreatProductDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "postProduct", null);
__decorate([
    (0, common_1.Post)('histogram-date'),
    (0, swagger_1.ApiOperation)({ summary: 'date histogram' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "histogramDate", null);
__decorate([
    (0, common_1.Post)('histogram'),
    (0, swagger_1.ApiOperation)({ summary: 'getting data using histogram figure' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "histogram", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'update product details' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete product inventory' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteProducr", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)('productsAPI'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map