import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHorasTrabajoDto } from './dto/create-horas_trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { HorasTrabajo } from './entities/horas_trabajo.entity';
import { format } from 'date-fns';
import { Between } from 'typeorm';

@Injectable()
export class HorasTrabajoService {
    constructor(
        @InjectRepository(HorasTrabajo)
        private horasTrabajoRepository: Repository<HorasTrabajo>,
    ) {}

    async create(
        createHorasTrabajoDto: CreateHorasTrabajoDto,
    ): Promise<CreateHorasTrabajoDto & HorasTrabajo> {
        try {
            return await this.horasTrabajoRepository.save(
                createHorasTrabajoDto,
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }

            throw new HttpException(
                `Error al crear el registro.`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async findAll(): Promise<HorasTrabajo[]> {
        const res: HorasTrabajo[] = await this.horasTrabajoRepository.find();
        return res.map((horasTrabajo) => {
            return {
                ...horasTrabajo,
                fecha: format(horasTrabajo.fecha, 'yyyy-MM-dd'),
            };
        });
    }

    findOne(id: number): Promise<HorasTrabajo | null> {
        return this.horasTrabajoRepository.findOne({
            where: { id },
        });
    }

    findByEmpleado(empleadoId: number): Promise<HorasTrabajo[]> {
        return this.horasTrabajoRepository.find({
            where: { empleadoId },
        });
    }

    findByEmpleadoAndFechas(
        empleadoId: number,
        fecha1: string,
        fecha2: string,
    ): Promise<HorasTrabajo[]> {
        return this.horasTrabajoRepository.find({
            where: {
                empleadoId,
                fecha: Between(fecha1, fecha2),
            },
        });
    }

    remove(id: number): Promise<DeleteResult> {
        return this.horasTrabajoRepository.delete(id);
    }
}
