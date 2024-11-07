import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationsModule } from './modules/authentications/authentications.module';
import { ItemsModule } from './modules/items/items.module';
import { PavilionsModule } from './modules/pavilions/pavilions.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './modules/mail/mail.module';
import { LoggingMiddleware } from './utils/logging.middleware';
import { JwtAuthMiddleware } from './modules/authentications/jwt-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL),
    PavilionsModule,
    RoomsModule,
    ItemsModule,
    ReservationsModule,
    UsersModule,
    AuthenticationsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*'); // Aplica o middleware para todas as rotas

    consumer
      .apply(JwtAuthMiddleware)
      .exclude( // Exclui as rotas públicas da verificação do JWT
        'authentications/login', 
        'authentications/reset-password', 
        'authentications/forgot-password', 
        'authentications/forgot-password/:token', 
        'authentications/active-account', 
      )
      .forRoutes('*'); // Aplica o middleware para todas as rotas, mas exclui as definidas acima
  }
}
