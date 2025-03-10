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
    findOne(@Param('id') id: string) {
        return this.empleadoService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.empleadoService.remove(+id);
    }
}
