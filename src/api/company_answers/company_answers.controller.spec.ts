import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAnswersController } from './company_answers.controller';
import { CompanyAnswersService } from './company_answers.service';

describe('CompanyAnswersController', () => {
  let controller: CompanyAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyAnswersController],
      providers: [CompanyAnswersService],
    }).compile();

    controller = module.get<CompanyAnswersController>(CompanyAnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
