import { ApiProperty } from "@nestjs/swagger";

export class ProductCategoriesDto{

    @ApiProperty({
        description: 'name of categories',
        example: 'KitchenWare',
      })
    CategoriesName:string;
    @ApiProperty({
        description: 'categories Description',
        example: 'HomeAppliens and also use for offices',
      })
    Description:string;
    @ApiProperty({
        description: 'name of ParentCategory',
        example: 'HomeWare',
      })
    ParentCategory:string;
}