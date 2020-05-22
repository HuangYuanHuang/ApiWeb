import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaserLayoutComponent } from './laser-layout.component';

describe('LaserLayoutComponent', () => {
  let component: LaserLayoutComponent;
  let fixture: ComponentFixture<LaserLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaserLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
