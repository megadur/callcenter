import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenSucheComponent } from './kunden-suche.component';

describe('KundenSucheComponent', () => {
  let component: KundenSucheComponent;
  let fixture: ComponentFixture<KundenSucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundenSucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
