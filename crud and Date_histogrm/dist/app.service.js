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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch = require("elasticsearch");
let AppService = class AppService {
    constructor() {
        this.esclient = new elasticsearch.Client({
            host: 'https://elastic-cc.streamspace.ai/elastic/',
        });
        this.esclient.ping({ requestTimeout: 3000 }).catch((e) => {
            console.log(e);
            throw new common_1.HttpException({
                status: 'error',
                message: 'Unable to reach Elasticsearch cluster',
            }, 500);
        });
    }
    async createProduct(productDto) {
        const { product_title, product_category, date } = productDto;
        const newBody = [];
        const body = {
            product_title,
            product_category,
            date,
        };
        newBody.push({ index: 'prodduct' });
        newBody.push(body);
        try {
            const result = await this.esclient.bulk({
                body: [
                    {
                        index: {
                            _index: `productindexx`,
                            _type: `activitylog-ojoj`,
                        },
                    },
                    body,
                ],
            });
            console.log(JSON.stringify(result));
            return result;
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
    async histogramDate() {
        try {
            const body = await this.esclient.search({
                index: 'productindexx',
                size: 0,
                body: {
                    aggregations: {
                        dates: {
                            date_histogram: {
                                field: "date",
                                interval: '1d',
                                format: 'yyyy-MM-dd',
                            }
                        }
                    }
                }
            });
            let object = body.aggregations.dates.buckets;
            let key = [];
            let doc_count = [];
            for (var i in object) {
                key.push(object[i].key_as_string);
            }
            console.log(key);
            for (var i in object) {
                doc_count.push(object[i].doc_count);
            }
            console.log(doc_count);
            let result = { key, doc_count };
            return result;
        }
        catch (error) {
            console.error('Error-->:', error);
            throw error;
        }
    }
    async getProduct() {
        try {
            const body = await this.esclient.search({
                index: 'productindexx',
                body: {
                    query: {
                        match_all: {},
                    },
                },
            });
            return body;
        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async getProductById(id) {
        try {
            const body = await this.esclient.search({
                index: 'productindexx',
                body: {
                    query: {
                        match: { _id: id },
                    },
                },
            });
            return body;
        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async getlistProduct(listDto) {
        try {
            const { pageno, limit } = listDto;
            const response = await this.esclient.search({
                index: 'productindexx',
                body: {
                    size: limit,
                    from: (pageno - 1) * limit,
                    query: {
                        match_all: {},
                    }
                }
            });
            return {
                response,
            };
        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async histogram() {
        try {
            const response = await this.esclient.search({
                index: 'productindexx',
                size: 0,
                body: {
                    aggregations: {
                        reviews: {
                            histogram: {
                                field: 'review',
                                interval: 100,
                            },
                        },
                    },
                },
            });
            let object = response.aggregations.reviews.buckets;
            let key = [];
            let doc_count = [];
            for (var i in object) {
                key.push(object[i].key);
            }
            for (var i in doc_count) {
                doc_count.push(object[i].doc_count);
            }
            let final = { key, doc_count };
            return final;
        }
        catch (error) {
            console.error('Error searching for histogram:', error);
            throw error;
        }
    }
    async removeProduct(id) {
        const index = 'product-index';
        const deleteResponse = await this.esclient.deleteByQuery({
            index: 'productindexx',
            body: {
                query: {
                    term: {
                        _id: id,
                    },
                },
            },
        });
        if (deleteResponse) {
            return { statusCode: 200, message: 'Deletion successful!' };
        }
        else {
            return { statusCode: 404, message: 'Unable to delete!' };
        }
    }
    async updateProduct(product_id, updateDto) {
        try {
            const { product_title, payment_type, quantity, updatedAt, } = updateDto;
            const body = {
                product_title,
                payment_type,
                quantity,
                updatedAt,
            };
            const result = await this.esclient.updateByQuery({
                index: 'productindexx',
                body: {
                    query: {
                        term: {
                            _id: product_id,
                        },
                    },
                },
            });
            console.log('Result ->', result);
            if (result) {
                return { statusCode: 200, message: 'Update successful!' };
            }
            else {
                return { statusCode: 404, message: 'Unable to update' };
            }
        }
        catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map