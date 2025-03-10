// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Controller('empleado')
export class EmpleadoController {
    constructor(private readonly empleadoService: EmpleadoService) {}

    @Post()
    create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
        return this.empleadoService.create(createEmpleadoDto);
    }

    @Get()
    findAll() {
        return this.empleadoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const idNumber: number = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return { message: 'Identificador NO valido' };
        }

        const empleado = await this.empleadoService.findOne(idNumber);
        if (!empleado) {
            return { message: 'Empleado no encontrado' };
        }

        return empleado;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const idNumber: number = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return { message: 'Identificador NO valido' };
        }

        const deleteResult = await this.empleadoService.remove(idNumber);

        if (deleteResult.affected) {
            return {
                message: `Registros eliminados: ${deleteResult.affected}`,
            };
        }

        return { message: 'Empleado no encontrado' };
    }
}
