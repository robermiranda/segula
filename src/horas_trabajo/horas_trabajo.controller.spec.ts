import { Test, TestingModule } from '@nestjs/testing';
import { HorasTrabajoController } from './horas_trabajo.controller';
import { HorasTrabajoService } from './horas_trabajo.service';

describe('HorasTrabajoController', () => {
  let controller: HorasTrabajoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorasTrabajoController],
      providers: [HorasTrabajoService],
    }).compile();

    controller = module.get<HorasTrabajoController>(HorasTrabajoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
