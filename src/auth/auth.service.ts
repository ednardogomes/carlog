import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRedis() private readonly redisClient: Redis
    ) { }


    private async getTokens(userId: string) {
        const payload = { sub: userId }
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                { ...payload, type: 'access' },
                { expiresIn: +this.configService.get<string>('JWT_ACCESS_EXPIRES_IN_SECOND') }
            ),
            this.jwtService.signAsync(
                { ...payload, type: 'refresh' },
                { expiresIn: +this.configService.get<string>('JWT_REFRESH_EXPIRES_IN_SECOND') }
            ),
        ]);

        return { access_token: `Bearer ${access_token}`, refresh_token }
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(pass, user.password)

        if (isMatch) {
            const { password, email, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const tokens = await this.getTokens(user.id)
        await this.redisClient.set(
            user.id,
            tokens.refresh_token,
            'EX',
            30
        )

        return { tokens, user }
    }

    async refresh(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync<{ sub: string, type: string }>(refreshToken)

            if (payload.type !== 'refresh') throw new UnauthorizedException('Autenticação inválida');

            const user = await this.usersService.getUserById(payload.sub)
            if (!user) throw new UnauthorizedException('Usuário não encontrado');

            const existingToken = await this.redisClient.get(payload.sub)
            if (!existingToken) throw new UnauthorizedException('Token não encontrado, faça login novamente')

            if (refreshToken !== existingToken) throw new UnauthorizedException('Refresh Token já foi utilizado');

            const tokens = await this.getTokens(payload.sub);

            await this.redisClient.set(
                payload.sub,
                tokens.refresh_token,
                'EX',
                15
            )

            return tokens;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            console.error(error)
            throw new UnauthorizedException('Refresh Token expirado ou inválido, faça login novamente');
        }
    }
}
