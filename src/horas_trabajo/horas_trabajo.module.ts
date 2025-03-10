import { Module } from '@nestjs/common';
import { HorasTrabajoService } from './horas_trabajo.service';
import { HorasTrabajoController } from './horas_trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorasTrabajo } from './entities/horas_trabajo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([HorasTrabajo])],
    controllers: [HorasTrabajoController],
    providers: [HorasTrabajoService],
})
export class HorasTrabajoModule {}
