import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @ApiProperty()
  productId: string;
}
export class CartDto {
  @ApiProperty()
  cart_item_id: string;

  @ApiProperty()
  quantity: number;
}
