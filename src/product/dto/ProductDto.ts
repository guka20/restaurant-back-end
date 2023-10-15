import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @ApiProperty()
  @MaxLength(150)
  @IsOptional()
  subtitle: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsUrl()
  image: string;
}

export class ProductDto {
  @ApiProperty()
  product_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  image: string;
}
export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  subtitle: string;

  @ApiProperty()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsOptional()
  category: string;
}
