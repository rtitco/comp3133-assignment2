import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebookingformComponent } from './createbookingform.component';

describe('CreatebookingformComponent', () => {
  let component: CreatebookingformComponent;
  let fixture: ComponentFixture<CreatebookingformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatebookingformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebookingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
