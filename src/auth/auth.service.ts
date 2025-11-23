import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
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

    private async updateRefreshToken(userId: string) {
        //fazer o refreshToken com o redis, por que o GPT está mostrando como fazer  se eu tivesse uma coluna em Users para ele no postgres.
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

        //salvar a hash refreshToken no banco(cache)

        return { tokens, user }
    }

    async refresh(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync<{ sub: string }>(refreshToken)

            const user = await this.usersService.getUserById(payload.sub)

            if (!user) throw new UnauthorizedException('Usuário não encontrado');

            const isRefreshTokenMatching = 'usar o bcrypt para comprar o token passada com a hash do token que está no banco'

            if (!isRefreshTokenMatching) {
                throw new UnauthorizedException('Refresh Token Inválido')
            }

            const tokens = await this.getTokens(user.id);

            //usar o updateRefreshToken para atualizar o refreshToken no banco

            return tokens;
        } catch (error) {
            throw new UnauthorizedException('Refresh Token expirado ou inválido')
        }
    }
}
