import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { AuthenticationService } from './services/authentication/authentication.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtService],
})
export class AppModule {}
