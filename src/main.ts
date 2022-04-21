import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.use(morgan('tiny'));

    if (process.env.NODE_ENV === 'production') {
        app.enableCors({
            origin: ['http://cpf.easy-form.net'],
            methods: 'POST,GET,PUT,PATCH,DELETE,OPTIONS',
            credentials: true,
        });
    } else if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }

    const port = app.get(ConfigService).get<string>('PORT');

    await app.listen(port);
}
bootstrap();
