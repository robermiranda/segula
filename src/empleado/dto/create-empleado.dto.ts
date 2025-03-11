import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
    description: 'DTO para la creación de un empleado',
})
export class CreateEmpleadoDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(40)
    @ApiProperty({
        description: 'Nombre del empleado',
        example: 'Juan Pérez',
        required: true,
        type: String,
        maxLength: 40,
    })
    readonly nombre: string;
}
