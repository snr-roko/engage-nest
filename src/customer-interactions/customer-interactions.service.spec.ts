import { Test, TestingModule } from '@nestjs/testing';
import { CustomerInteractionsService } from './customer-interactions.service';

describe('CustomerInteractionsService', () => {
  let service: CustomerInteractionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerInteractionsService],
    }).compile();

    service = module.get<CustomerInteractionsService>(CustomerInteractionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
