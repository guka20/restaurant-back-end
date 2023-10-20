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
import { CartEntity } from 'src/cart/entity/cart.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}
  async createCart(
    createCartItemDto: CreateCartItemDto,
    ownerId: string,
  ): Promise<CartDto> {
    const product = await this.productRepository.findOneBy({
      product_id: createCartItemDto.productId,
    });
    const user = await this.userRepository.findOne({
      where: {
        id: ownerId,
      },
      relations: ['cart'],
    });
    const existingCartItem = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .where('cartItem.product = :productId', {
        productId: product.product_id,
      })
      .getOne();

    if (existingCartItem)
      throw new HttpException(
        'Product is already in cart',
        HttpStatus.BAD_REQUEST,
      );
    if (!user || !product)
      throw new NotFoundException('Wrong token or product id');
    const cart = await this.cartRepository.findOneBy({
      cart_id: user.cart.cart_id,
    });
    const newCartItem = this.cartItemRepository.create();
    newCartItem.cart = cart;
    newCartItem.product = product;
    const data = await this.cartItemRepository.save(newCartItem);
    return data;
  }

  async changeQuantity(cart_id: string, quantity: number): Promise<void> {
    const updatedCart = await this.cartItemRepository
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
    const deletedCart = await this.cartItemRepository
      .createQueryBuilder()
      .delete()
      .from(CartItemEntity)
      .where('cart_item_id=:cart_item_id', { cart_item_id: cart_id })
      .execute();
    if (deletedCart.affected === 0) {
      throw new HttpException('Could not find product', HttpStatus.NOT_FOUND);
    }
  }
}
