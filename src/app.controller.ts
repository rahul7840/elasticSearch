import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update.dto';
import { query } from 'express';
import { ListDTO } from './dto/list.dto';
import { ProductCategoriesDto } from './dto/creatCetegories.dto';

@ApiTags('productsAPI')
@Controller('products')
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

  //mapping
  @Put('create-mapping')
  async createMapping() {
    await this.appService.putMapping();
    return 'Mapping created successfully';
  }

  @Put(':id')
  @ApiOperation({ summary: 'update product details' })
  async updateProduct(
    @Param('id') product_id: string,
    @Body() updateDto: UpdateProductDto,
  ) {
    return this.appService.updateProduct(product_id, updateDto);
  }
  @Post('creat-product')
  @ApiOperation({ summary: 'creat product inventory' })
  async postProduct(@Body() creatDTO: CreatProductDto) {
    return await this.appService.createProduct(creatDTO);
  }
  @Post('histogram')
  @ApiOperation({ summary: 'getting data using histogram figure' })
  async histogram() {
    return await this.appService.histogram();
  }
  @Post('histogram-date')
  @ApiOperation({summary:'date histogram'})
  async histogramDate(){
    return await this.appService.histogramDate();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product inventory' })
  async deleteProducr(@Param('id') id: string) {
    return this.appService.removeProduct(id);
  }


//-----------------creat-search-two------

 
  @Get('getall-categories')
  @ApiTags('categoriesApi')
  @ApiOperation({ summary: '----------> getall product categories' })
   async getCategories(){
   return await this.appService.categoriesGetAll()}

  @Get('searchtext')
  @ApiTags('categoriesApi')
  async searchCategories(@Query('searchtext') searchtext:string){
    return await this.appService.categoriesSearch(searchtext)
  }

  @Post('creat-categories')
  @ApiTags('categoriesApi')
  @ApiOperation({ summary: '----------> creat product categories' })
  async postCategories(@Body() categoriesDto:ProductCategoriesDto){
    return await this.appService.creatCategories(categoriesDto)  }




  
}
