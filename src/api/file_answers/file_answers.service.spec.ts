import { Test, TestingModule } from '@nestjs/testing';
import { FileAnswersService } from './file_answers.service';

describe('FileAnswersService', () => {
  let service: FileAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileAnswersService],
    }).compile();

    service = module.get<FileAnswersService>(FileAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
