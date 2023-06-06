import { v4 as uuidv4 } from 'uuid';

import { ApiProperty } from '@nestjs/swagger';
export class CreatProductDto {


  @ApiProperty({
    description: 'enter product title',
    example: 'phone',
  })
  product_title: string;
  @ApiProperty({
    description: 'enter product category',
    example: 'electronics',
  })
  product_category: string;
  @ApiProperty({
    description: 'enter product brand-name',
    example: 'motorola',
  })
  brand_name: string;
  @ApiProperty({
    description: 'enter product details',
    example: 'super-good product must take ',
  })
  product_detail: string;
  @ApiProperty({
    description: 'enter product price',
    example: '80,999',
  })
  price: string;
  @ApiProperty({
    description: 'does it available',
    example: 'true',
  })
  in_stock: boolean;
  @ApiProperty({
    description: 'how many review this have',
    example: '100',
  })
  review: number;
  @ApiProperty({
    description: 'any discount',
    example: '70% off',
  })
  dicount: string;
  @ApiProperty({
    description: 'enter product brand-name',
    example: 'phone, iphone.good phone',
  })
  keywords: string;

  @ApiProperty({
    description: 'enter product img url',
    example: 'http://phone/img',
  })
  product_img: string; //(url)
  @ApiProperty({
    description: 'payment type',
    example: 'cash on delivery',
  })
  payment_type: string;
  @ApiProperty({
    description: 'enter product Quntity left',
    example: '80',
  })
  quantity: number;
  @ApiProperty({
    description: 'enter product start date',
    example: '10-10-2020',
  })
  @ApiProperty({
    description: 'enter product start date',
    example: '12-10-2020',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'enter product date',
    example: '2001-01-01',
  })
  date:Date;

}
