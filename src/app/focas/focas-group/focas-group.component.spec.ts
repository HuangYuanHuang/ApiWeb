import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocasGroupComponent } from './focas-group.component';

describe('FocasGroupComponent', () => {
  let component: FocasGroupComponent;
  let fixture: ComponentFixture<FocasGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocasGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocasGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
