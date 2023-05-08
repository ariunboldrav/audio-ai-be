import { Test, TestingModule } from '@nestjs/testing';
import { FilePathsService } from './file_paths.service';

describe('FilePathsService', () => {
  let service: FilePathsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilePathsService],
    }).compile();

    service = module.get<FilePathsService>(FilePathsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
