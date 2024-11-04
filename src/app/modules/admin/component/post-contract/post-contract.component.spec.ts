import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContractComponent } from './post-contract.component';

describe('PostContractComponent', () => {
  let component: PostContractComponent;
  let fixture: ComponentFixture<PostContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
