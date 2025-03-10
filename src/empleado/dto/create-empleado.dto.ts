import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmpleadoDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;
}
