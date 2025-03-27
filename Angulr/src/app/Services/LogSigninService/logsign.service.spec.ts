import { TestBed } from '@angular/core/testing';

import { LogsignService } from './logsign.service';

describe('LogsignService', () => {
  let service: LogsignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogsignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
