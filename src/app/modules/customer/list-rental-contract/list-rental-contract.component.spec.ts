import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentalContractComponent } from './list-rental-contract.component';

describe('ListRentalContractComponent', () => {
  let component: ListRentalContractComponent;
  let fixture: ComponentFixture<ListRentalContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRentalContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRentalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
