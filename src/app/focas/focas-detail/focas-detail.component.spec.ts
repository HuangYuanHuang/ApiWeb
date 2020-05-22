import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocasDetailComponent } from './focas-detail.component';

describe('FocasDetailComponent', () => {
  let component: FocasDetailComponent;
  let fixture: ComponentFixture<FocasDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocasDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
