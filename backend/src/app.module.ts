import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { AuthenticationService } from './services/authentication/authentication.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { IsAdminMiddleware, IsGuestMiddleware } from './middleware/RoleMiddelware';
@Module({
  imports: [],
  controllers: [AuthenticationController, UserController],
  providers: [AuthenticationService, JwtService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsGuestMiddleware).forRoutes({path: 'users', method: RequestMethod.GET});
    consumer.apply(IsAdminMiddleware).forRoutes({ path: 'users', method: RequestMethod.DELETE });
    consumer.apply(IsAdminMiddleware).forRoutes({ path: 'users', method: RequestMethod.PATCH });
    consumer.apply(IsAdminMiddleware).forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
