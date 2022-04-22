import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth';
import { HealthModule } from 'src/health';
import { LeadModule } from 'src/leads';
import { UserModule } from 'src/users';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): MongooseModuleOptions => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
        }),
        AuthModule,
        HealthModule,
        LeadModule,
        UserModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
