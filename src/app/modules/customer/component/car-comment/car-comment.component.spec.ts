import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCommentComponent } from './car-comment.component';

describe('CarCommentComponent', () => {
  let component: CarCommentComponent;
  let fixture: ComponentFixture<CarCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
