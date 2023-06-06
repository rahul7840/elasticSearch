import { AppService } from './app.service';
import { CreatProductDto } from './dto/creatProduct.dto';
import { ListDTO } from './dto/list.dto';
import { UpdateProductDto } from './dto/update.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getProduct(): Promise<any>;
    getProductbyID(id: string): Promise<any>;
    getlist(listDto: ListDTO): Promise<{
        response: any;
    }>;
    postProduct(creatDTO: CreatProductDto): Promise<any>;
    histogramDate(): Promise<{
        key: any[];
        doc_count: any[];
    }>;
    histogram(): Promise<{
        key: any[];
        doc_count: any[];
    }>;
    updateProduct(product_id: string, updateDto: UpdateProductDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    deleteProducr(id: string): Promise<{
        statusCode: number;
        message: string;
    }>;
}
