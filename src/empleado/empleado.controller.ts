// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { IdGuard } from '../guards/id.guard';

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
    @UseGuards(IdGuard)
    async findOne(@Param('id') id: string) {
        const empleado = await this.empleadoService.findOne(parseInt(id, 10));
        if (!empleado) {
            return { message: 'Empleado no encontrado' };
        }

        return empleado;
    }

    @Delete(':id')
    @UseGuards(IdGuard)
    async remove(@Param('id') id: string) {
        const deleteResult = await this.empleadoService.remove(
            parseInt(id, 10),
        );

        if (deleteResult.affected) {
            return {
                message: `Registros eliminados: ${deleteResult.affected}`,
            };
        }

        return { message: 'Empleado no encontrado' };
    }
}
