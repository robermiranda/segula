import { Test, TestingModule } from '@nestjs/testing';
import { HorasTrabajoService } from './horas_trabajo.service';

describe('HorasTrabajoService', () => {
  let service: HorasTrabajoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorasTrabajoService],
    }).compile();

    service = module.get<HorasTrabajoService>(HorasTrabajoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
