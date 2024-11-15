import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCarComponent } from './total-car.component';

describe('TotalCarComponent', () => {
  let component: TotalCarComponent;
  let fixture: ComponentFixture<TotalCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
