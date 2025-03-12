import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const config = new DocumentBuilder()
        .setTitle('API Prueba Técnica SEGULA')
        .setDescription(
            `Esta API permite la gestión de empleados
            así como las horas de trabajo de los mismos, además
            de calcular el payroll del empleado.`,
        )
        .setVersion('1.0')
        .build();
    const documentFactory = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => console.error(err));
