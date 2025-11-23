import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            if (info) {
                console.error('JWT Auth Error Info:', info)
            }

            throw new UnauthorizedException('Token de acesso inválido ou expirado');
        }
        return user;
    }
}