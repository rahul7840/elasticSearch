import { v4 as uuidv4 } from 'uuid';

import { ApiProperty } from '@nestjs/swagger';
export class UpdateProductDto {
  @ApiProperty({
    description: 'enter product title',
    example: 'phone',
  })
  product_title: string;
  
  @ApiProperty({
    description: 'payment type',
    example: 'cod',
  })
  payment_type: string;
  @ApiProperty({
    description: 'enter product Quntity left',
    example: '80',
  })
  quantity: number;

  updatedAt: Date;
}
