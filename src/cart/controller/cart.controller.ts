import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { ApiOperation } from '@nestjs/swagger';
import { CartDto, CreateCartDto } from '../dto/cart.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create New Cart' })
  async createCart(
    @Req() req: Request,
    @Body() createCartDto: CreateCartDto,
  ): Promise<CartDto> {
    return this.cartService.createCart(createCartDto, req['user'].sub);
  }

  @Patch(':cart_id')
  @ApiOperation({ summary: 'Add Quantity In The Cart' })
  @UseGuards(AuthGuard)
  async changeQuantity(
    @Body() quantityDto: { quantity: number },
    @Param('cart_id', new ParseUUIDPipe()) cart_id: string,
  ): Promise<void> {
    this.cartService.changeQuantity(cart_id, quantityDto.quantity);
  }
  @Get('all')
  @ApiOperation({ summary: 'Get All Carts' })
  @UseGuards(AuthGuard)
  async GetCarts(@Req() req: Request): Promise<CartDto[]> {
    return this.cartService.GetCarts(req['user'].sub);
  }
}
