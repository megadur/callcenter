import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutzerSucheComponent } from './nutzer-suche.component';

describe('NutzerSucheComponent', () => {
  let component: NutzerSucheComponent;
  let fixture: ComponentFixture<NutzerSucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutzerSucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutzerSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
