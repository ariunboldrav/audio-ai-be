import { Test, TestingModule } from '@nestjs/testing';
import { FilePathsController } from './file_paths.controller';
import { FilePathsService } from './file_paths.service';

describe('FilePathsController', () => {
  let controller: FilePathsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilePathsController],
      providers: [FilePathsService],
    }).compile();

    controller = module.get<FilePathsController>(FilePathsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
