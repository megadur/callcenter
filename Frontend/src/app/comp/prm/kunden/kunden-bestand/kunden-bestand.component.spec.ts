import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenBestandComponent } from './kunden-bestand.component';

describe('KundenBestandComponent', () => {
  let component: KundenBestandComponent;
  let fixture: ComponentFixture<KundenBestandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundenBestandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenBestandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
