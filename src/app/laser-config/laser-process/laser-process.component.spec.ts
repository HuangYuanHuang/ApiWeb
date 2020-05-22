import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaserProcessComponent } from './laser-process.component';

describe('LaserProcessComponent', () => {
  let component: LaserProcessComponent;
  let fixture: ComponentFixture<LaserProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaserProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaserProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
