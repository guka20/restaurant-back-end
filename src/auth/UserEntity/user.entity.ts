import { UserRole } from 'src/types/user.types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  })
  role: UserRole;
}
