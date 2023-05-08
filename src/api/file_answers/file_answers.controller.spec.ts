import { Test, TestingModule } from '@nestjs/testing';
import { FileAnswersController } from './file_answers.controller';
import { FileAnswersService } from './file_answers.service';

describe('FileAnswersController', () => {
  let controller: FileAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileAnswersController],
      providers: [FileAnswersService],
    }).compile();

    controller = module.get<FileAnswersController>(FileAnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
