import { Module, Global } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';

@Global()
@Module({
    imports: [
        NestRedisModule.forRootAsync({
            useFactory: () => {
                return {
                    type: 'single',
                    url: process.env.REDIS_CONNECTION_STRING,
                };
            },
        }),
    ],
    exports: [NestRedisModule],
})
export class RedisModule { }
