import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalContractComponent } from './total-contract.component';

describe('TotalContractComponent', () => {
  let component: TotalContractComponent;
  let fixture: ComponentFixture<TotalContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
