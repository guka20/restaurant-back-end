import { IsOptional } from 'class-validator';
import { CartItemEntity } from 'src/cart-item/entity/cartitem.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { UserRole } from 'src/types/user.types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  @JoinColumn({ name: 'Cart_Id' })
  cart: CartEntity;
}
