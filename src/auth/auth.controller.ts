import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Req() req) {
        return this.authService.login(req.user);
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Req() req: Request) {
        const token = req.cookies['refresh_token']

        return this.authService.refresh(req.cookies['refresh_token']);
    }
}
