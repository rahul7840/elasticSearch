import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatProductDto } from './dto/creatProduct.dto';
import { ListDTO } from './dto/list.dto';
import { UpdateProductDto } from './dto/update.dto';

@ApiTags('productsAPI')
@Controller('product')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  @ApiOperation({ summary: 'get all list' })
  async getProduct() {
    return await this.appService.getProduct();
  }
  @Get(':id')
  @ApiOperation({ summary: 'get product by id' })
  async getProductbyID(@Query('id') id: string) {
    return await this.appService.getProductById(id);
  }
  @Get('list')
  @ApiOperation({ summary: 'pagination' })
  async getlist(@Query() listDto: ListDTO) {
    return await this.appService.getlistProduct(listDto);
  }

  @Post('creat-product')
  @ApiOperation({ summary: 'creat product inventory' })
  async postProduct(@Body() creatDTO: CreatProductDto) {
    return await this.appService.createProduct(creatDTO);
  }
  @Post('histogram-date')
  @ApiOperation({summary:'date histogram'})
  async histogramDate(){
    return await this.appService.histogramDate();
  }
  @Post('histogram')
  @ApiOperation({ summary: 'getting data using histogram figure' })
  async histogram() {
    return await this.appService.histogram();
  }

  @Put(':id')
  @ApiOperation({ summary: 'update product details' })
  async updateProduct(
    @Param('id') product_id: string,
    @Body() updateDto: UpdateProductDto,
  ) {
    return this.appService.updateProduct(product_id, updateDto);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product inventory' })
  async deleteProducr(@Param('id') id: string) {
    return this.appService.removeProduct(id);
  }
}
