import { CreatProductDto } from './dto/creatProduct.dto';
import { ListDTO } from './dto/list.dto';
import { UpdateProductDto } from './dto/update.dto';
export declare class AppService {
    private readonly esclient;
    client: any;
    constructor();
    createProduct(productDto: CreatProductDto): Promise<any>;
    histogramDate(): Promise<{
        key: any[];
        doc_count: any[];
    }>;
    getProduct(): Promise<any>;
    getProductById(id: any): Promise<any>;
    getlistProduct(listDto: ListDTO): Promise<{
        response: any;
    }>;
    histogram(): Promise<{
        key: any[];
        doc_count: any[];
    }>;
    removeProduct(id: string): Promise<{
        statusCode: number;
        message: string;
    }>;
    updateProduct(product_id: any, updateDto: UpdateProductDto): Promise<{
        statusCode: number;
        message: string;
    }>;
}
