import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaserOperationComponent } from './laser-operation.component';

describe('LaserOperationComponent', () => {
  let component: LaserOperationComponent;
  let fixture: ComponentFixture<LaserOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaserOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaserOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
