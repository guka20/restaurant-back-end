import { IsOptional } from 'class-validator';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { UserRole } from 'src/types/user.types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
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

  @Column({ default: null })
  image: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsOptional()
  role: UserRole;

  @OneToMany(() => ProductEntity, (product) => product.owner)
  products: ProductEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.cartowner)
  @JoinColumn({ name: 'carts' })
  carts: CartEntity[];
}
