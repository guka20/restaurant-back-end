import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartItemEntity } from '../entity/cartitem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { CartDto, CreateCartItemDto } from '../dto/cartitem.dto';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartRepository: Repository<CartItemEntity>,
  ) {}
  async createCart(
    createCartItemDto: CreateCartItemDto,
    ownerId: string,
  ): Promise<CartDto> {
    const product = await this.productRepository.findOneBy({
      product_id: createCartItemDto.productId,
    });
    const user = await this.userRepository.findOneBy({
      id: ownerId,
    });

    if (!user || !product)
      throw new NotFoundException('Wrong token or product id');
    const newCart = this.cartRepository.create();
    // newCart.cartowner = user;
    newCart.product = product;
    const data = await this.cartRepository.save(newCart);
    return data;
  }

  async changeQuantity(cart_id: string, quantity: number): Promise<void> {
    const updatedCart = await this.cartRepository
      .createQueryBuilder()
      .update(CartItemEntity)
      .set({
        quantity,
      })
      .where('cart_item_id=:cart_item_id', { cart_item_id: cart_id })
      .execute();
    if (updatedCart.affected === 0) {
      throw new HttpException('Could not find product', HttpStatus.NOT_FOUND);
    }
  }
  async deleteCartItem(cart_id: string): Promise<void> {
    const deletedCart = await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(CartItemEntity)
      .where('cart_item_id=:cart_item_id', { cart_item_id: cart_id })
      .execute();
    if (deletedCart.affected === 0) {
      throw new HttpException('Could not find product', HttpStatus.NOT_FOUND);
    }
  }
  async GetCarts(owner_id: string): Promise<CartDto[]> {
    const carts = await this.cartRepository.find({
      where: {},
    });

    return carts;
  }
}
