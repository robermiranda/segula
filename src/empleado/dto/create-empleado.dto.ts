import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateEmpleadoDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(40)
    readonly nombre: string;
}
