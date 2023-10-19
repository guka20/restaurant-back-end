import { ApiOperation } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { CartService } from '../service/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('all')
  @ApiOperation({ summary: 'Get All Cart items' })
  @UseGuards(AuthGuard)
  async GetCarts(@Req() req: Request) {
    return this.cartService.GetCarts(req['user'].sub);
  }
}
