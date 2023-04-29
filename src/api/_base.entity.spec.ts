import { BaseEntity } from './_base.entity';

describe('BaseEntity', () => {
  it('should be defined', () => {
    expect(new BaseEntity()).toBeDefined();
  });
});
