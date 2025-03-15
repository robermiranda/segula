import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmpleadoModule } from './empleado/empleado.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Empleado } from './empleado/entities/empleado.entity';
import { HorasTrabajoModule } from './horas_trabajo/horas_trabajo.module';
import { HorasTrabajo } from './horas_trabajo/entities/horas_trabajo.entity';
import { ParametrosService } from './parametros/parametros.service';
import { Parametro } from './parametros/entities/parametro.entity';

@Module({
    imports: [
        EmpleadoModule,
        HorasTrabajoModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get<string>('DATABASE_URL'),
                synchronize: false,
                entities: [Empleado, HorasTrabajo, Parametro],
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Parametro]),
    ],
    providers: [ParametrosService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
