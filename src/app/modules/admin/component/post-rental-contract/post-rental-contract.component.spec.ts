import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRentalContractComponent } from './post-rental-contract.component';

describe('PostRentalContractComponent', () => {
  let component: PostRentalContractComponent;
  let fixture: ComponentFixture<PostRentalContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostRentalContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRentalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
