import { ProductEntity } from 'src/product/ProductEntity/product.entity';
import { UserRole } from 'src/types/user.types';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: null })
  image: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @OneToMany(() => ProductEntity, (product) => product.owner)
  products: ProductEntity[];
}
