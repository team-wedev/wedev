import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { WebhookModule } from './webhook/webhook.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DeserializerMiddleware } from './common/middlewares/deserializer/deserializer.middleware';
import { UserSessionModule } from './user-session/user-session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthenticationModule,
    WebhookModule,
    UserModule,
    VideoModule,
    UserSessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeserializerMiddleware).forRoutes('*');
  }
}
