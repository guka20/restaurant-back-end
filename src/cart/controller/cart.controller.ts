import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CartService } from '../service/cart.service';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('all')
  @ApiOperation({ summary: 'Get All Cart items' })
  @UseGuards(AuthGuard)
  async GetCarts(@Req() req: Request) {
    return this.cartService.GetCarts(req['user'].sub);
  }
}
