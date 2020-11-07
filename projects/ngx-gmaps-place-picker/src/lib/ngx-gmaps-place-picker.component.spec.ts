import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGmapsPlacePickerComponent } from './ngx-gmaps-place-picker.component';

describe('NgxGmapsPlacePickerComponent', () => {
  let component: NgxGmapsPlacePickerComponent;
  let fixture: ComponentFixture<NgxGmapsPlacePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxGmapsPlacePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGmapsPlacePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
