import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parametro } from './entities/parametro.entity';

@Injectable()
export class ParametrosService {
    private jornadaLaboral: number;
    private factorHoraExtra: number;

    constructor(
        @InjectRepository(Parametro)
        private readonly parametrosRepository: Repository<Parametro>,
    ) {}

    async loadJornadaLaboral() {
        const parametro = await this.parametrosRepository.findOne({
            where: { nombre: 'jornada_laboral' },
        });

        if (parametro) {
            this.jornadaLaboral = parseInt(parametro.valor, 10);
        } else {
            throw new Error('Parámetro "jornada_laboral" NO encontrado');
        }
    }

    async loadFactorHoraExtra() {
        const parametro = await this.parametrosRepository.findOne({
            where: { nombre: 'factor_hora_extra' },
        });

        if (parametro) {
            this.factorHoraExtra = parseFloat(parametro.valor);
        } else {
            throw new Error('Parámetro "factor_hora_extra" NO encontrado');
        }
    }

    getJornadaLaboral(): number {
        return this.jornadaLaboral;
    }

    getFactorHoraExtra(): number {
        return this.factorHoraExtra;
    }
}
