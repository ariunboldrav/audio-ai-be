import { Test, TestingModule } from '@nestjs/testing';
import { UserVerifyController } from './user_verify.controller';
import { UserVerifyService } from './user_verify.service';

describe('UserVerifyController', () => {
  let controller: UserVerifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVerifyController],
      providers: [UserVerifyService],
    }).compile();

    controller = module.get<UserVerifyController>(UserVerifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
