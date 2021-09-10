import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpAuthorComponent } from './sign-up-author.component';

describe('SignUpAuthorComponent', () => {
  let component: SignUpAuthorComponent;
  let fixture: ComponentFixture<SignUpAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
