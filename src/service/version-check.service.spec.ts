/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { VersionCheckService } from './version-check.service';

describe('Service: VersionCheck', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VersionCheckService]
    });
  });

  it('should ...', inject([VersionCheckService], (service: VersionCheckService) => {
    expect(service).toBeTruthy();
  }));
});
