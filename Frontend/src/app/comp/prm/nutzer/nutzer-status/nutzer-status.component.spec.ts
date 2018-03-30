import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutzerStatusComponent } from './nutzer-status.component';

describe('NutzerStatusComponent', () => {
  let component: NutzerStatusComponent;
  let fixture: ComponentFixture<NutzerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutzerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutzerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
