import { Min } from 'class-validator';
import { UserEntity } from 'src/auth/UserEntity/user.entity';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  cart_item_id: string;

  @ManyToOne(() => UserEntity, (user) => user.carts)
  @JoinColumn({ name: 'cartowner_id' })
  cartowner: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.carts)
  @JoinColumn({ name: 'product' })
  product: ProductEntity;

  @Column({ default: 1 })
  @Min(1)
  quantity: number;
}
