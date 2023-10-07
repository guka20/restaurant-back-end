import { ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptionDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 30 })
  @Max(50)
  @Type(() => Number)
  readonly take?: number = 20;
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({ minimum: 1, default: 30 })
  @Type(() => Number)
  readonly page?: number = 1;

  @Exclude()
  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
