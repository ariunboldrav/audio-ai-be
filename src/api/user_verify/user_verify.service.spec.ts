import { Test, TestingModule } from '@nestjs/testing';
import { UserVerifyService } from './user_verify.service';

describe('UserVerifyService', () => {
  let service: UserVerifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserVerifyService],
    }).compile();

    service = module.get<UserVerifyService>(UserVerifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
