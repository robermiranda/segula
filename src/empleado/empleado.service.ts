import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(Empleado)
        private empleadoRepository: Repository<Empleado>,
    ) {}

    create(
        createEmpleadoDto: CreateEmpleadoDto,
    ): Promise<CreateEmpleadoDto & Empleado> {
        return this.empleadoRepository.save(createEmpleadoDto);
    }

    findAll(): Promise<Empleado[]> {
        return this.empleadoRepository.find();
    }

    findOne(id: number): Promise<Empleado | null> {
        return this.empleadoRepository.findOne({
            where: { id },
        });
    }

    remove(id: number): Promise<DeleteResult> {
        return this.empleadoRepository.delete(id);
    }
}
