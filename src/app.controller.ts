import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  // @ts-ignore
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('/auth/logout')
  async logout(@Req() req: Request) {
    return {
      message: 'succsess',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  // @ts-ignore
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
