import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaserHomeComponent } from './laser-home.component';

describe('LaserHomeComponent', () => {
  let component: LaserHomeComponent;
  let fixture: ComponentFixture<LaserHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaserHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
