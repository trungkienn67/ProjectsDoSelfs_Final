import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetALlCommentComponent } from './get-all-comment.component';

describe('GetALlCommentComponent', () => {
  let component: GetALlCommentComponent;
  let fixture: ComponentFixture<GetALlCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetALlCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetALlCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
