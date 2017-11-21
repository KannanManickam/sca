import { TestBed, inject } from '@angular/core/testing';

import { CustServRecordService } from './cust-serv-record.service';

describe('CustServRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustServRecordService]
    });
  });

  it('should be created', inject([CustServRecordService], (service: CustServRecordService) => {
    expect(service).toBeTruthy();
  }));
});
