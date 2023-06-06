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
exports.CreatProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatProductDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product title',
        example: 'phone',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "product_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product category',
        example: 'electronics',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "product_category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product brand-name',
        example: 'motorola',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "brand_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product details',
        example: 'super-good product must take ',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "product_detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product price',
        example: '80,999',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'does it available',
        example: 'true',
    }),
    __metadata("design:type", Boolean)
], CreatProductDto.prototype, "in_stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'how many review this have',
        example: '100',
    }),
    __metadata("design:type", Number)
], CreatProductDto.prototype, "review", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'any discount',
        example: '70% off',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "dicount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product brand-name',
        example: 'phone, iphone.good phone',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product img url',
        example: 'http://phone/img',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "product_img", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'payment type',
        example: 'cash on delivery',
    }),
    __metadata("design:type", String)
], CreatProductDto.prototype, "payment_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product Quntity left',
        example: '80',
    }),
    __metadata("design:type", Number)
], CreatProductDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product start date',
        example: '10-10-2020',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'enter product start date',
        example: '12-10-2020',
    }),
    __metadata("design:type", Date)
], CreatProductDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'enter product date',
        example: '2001-01-01',
    }),
    __metadata("design:type", Date)
], CreatProductDto.prototype, "date", void 0);
exports.CreatProductDto = CreatProductDto;
//# sourceMappingURL=creatProduct.dto.js.map