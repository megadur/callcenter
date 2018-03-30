import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSucheComponent } from './error-suche.component';

describe('ErrorSucheComponent', () => {
  let component: ErrorSucheComponent;
  let fixture: ComponentFixture<ErrorSucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorSucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
