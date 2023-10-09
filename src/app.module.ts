import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { PaginationModule } from '@app/restaurant';
import { CartController } from './cart/controller/cart.controller';
import { CartService } from './cart/service/cart.service';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [
    ProductModule,
    AuthModule,
    DatabaseModule,
    CartModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('SECRET_KEY'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
