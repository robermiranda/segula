import { Module } from '@nestjs/common';
import { HorasTrabajoService } from './horas_trabajo.service';
import { HorasTrabajoController } from './horas_trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorasTrabajo } from './entities/horas_trabajo.entity';
import { ParametrosService } from 'src/parametros/parametros.service';
import { Parametro } from 'src/parametros/entities/parametro.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([HorasTrabajo]),
        TypeOrmModule.forFeature([Parametro]),
    ],
    controllers: [HorasTrabajoController],
    providers: [HorasTrabajoService, ParametrosService],
})
export class HorasTrabajoModule {}
