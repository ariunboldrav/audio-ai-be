import { Test, TestingModule } from '@nestjs/testing';
import { CompanyUsersController } from './company_users.controller';
import { CompanyUsersService } from './company_users.service';

describe('CompanyUsersController', () => {
  let controller: CompanyUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyUsersController],
      providers: [CompanyUsersService],
    }).compile();

    controller = module.get<CompanyUsersController>(CompanyUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
