import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocasConnectComponent } from './focas-connect.component';

describe('FocasConnectComponent', () => {
  let component: FocasConnectComponent;
  let fixture: ComponentFixture<FocasConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocasConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocasConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
