import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAnswersService } from './company_answers.service';

describe('CompanyAnswersService', () => {
  let service: CompanyAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyAnswersService],
    }).compile();

    service = module.get<CompanyAnswersService>(CompanyAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
