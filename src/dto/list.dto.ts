import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ListDTO {
  @IsNotEmpty({
    message: `Please enter limit.`,
  })
  @IsNumber()
  @ApiProperty({
    description: 'Number of items to return per page',
    example: 10,
  })
  limit: number;

  @IsNotEmpty({
    message: `Please enter limit.`,
  })
  @IsNumber()
  @ApiProperty({
    description: 'Number of items to return per page',
    example: 10,
  })
  pageno: number;
  // @ApiProperty({
  //   description: 'search text',
  //   example: 10,
  // })
  // searchText: string;
}
