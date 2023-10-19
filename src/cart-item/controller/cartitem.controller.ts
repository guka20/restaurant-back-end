import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartItemService } from '../service/cartitem.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartDto, CreateCartItemDto } from '../dto/cartitem.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('cart')
@ApiTags('Cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create New Cart Item' })
  async createCart(
    @Req() req: Request,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartDto> {
    return this.cartItemService.createCart(createCartItemDto, req['user'].sub);
  }

  @Patch(':cart_id')
  @ApiOperation({ summary: 'Change Quantity in cart item' })
  @UseGuards(AuthGuard)
  async changeQuantity(
    @Body() quantityDto: { quantity: number },
    @Param('cart_id', new ParseUUIDPipe()) cart_id: string,
  ): Promise<void> {
    return this.cartItemService.changeQuantity(cart_id, quantityDto.quantity);
  }

  @Delete(':cart_id')
  @ApiOperation({ summary: 'Delete Cart Item' })
  @UseGuards(AuthGuard)
  async deleteCartItem(@Param('cart_id', new ParseUUIDPipe()) cart_id: string) {
    return this.cartItemService.deleteCartItem(cart_id);
  }
}
