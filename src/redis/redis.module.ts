import { Module } from '@nestjs/common';
import { RedisModule as ExternalRedisModule } from '@nestjs-modules/ioredis';

@Module({
    imports: [
        ExternalRedisModule.forRootAsync({
            useFactory: () => {
                return {
                    type: 'single',
                    url: process.env.REDIS_CONNECTION_STRING
                }
            }
        })
    ],
})
export class RedisModule { }
