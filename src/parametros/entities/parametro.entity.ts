import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parametros')
export class Parametro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    valor: string;
}
