import { TestBed } from '@angular/core/testing';

import { NgxGmapsPlacePickerService } from './ngx-gmaps-place-picker.service';

describe('NgxGmapsPlacePickerService', () => {
  let service: NgxGmapsPlacePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxGmapsPlacePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
