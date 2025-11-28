import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response as ExpressResponse } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @Req() req: RequestWithUser,
        @Res({ passthrough: true }) res: ExpressResponse
    ) {
        const data = await this.authService.login(req.user);
        res.cookie('refresh_token', data.tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: 'strict'
        })

        return data;
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Req() req: Request) {
        return this.authService.refresh(req.cookies['refresh_token']);
    }
}
