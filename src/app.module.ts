import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CustomExceptionFilter } from './filters/custom-exception/custom-exception.filter';
import { APP_FILTER } from '@nestjs/core';
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
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
