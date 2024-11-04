import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFixComponent } from './car-fix.component';

describe('CarFixComponent', () => {
  let component: CarFixComponent;
  let fixture: ComponentFixture<CarFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarFixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
