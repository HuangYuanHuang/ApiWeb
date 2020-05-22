import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocasHomeComponent } from './focas-home.component';

describe('FocasHomeComponent', () => {
  let component: FocasHomeComponent;
  let fixture: ComponentFixture<FocasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocasHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
