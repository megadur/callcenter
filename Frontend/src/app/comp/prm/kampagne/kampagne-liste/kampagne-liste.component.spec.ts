import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KampagneListeComponent } from './kampagne-liste.component';

describe('KampagneListeComponent', () => {
  let component: KampagneListeComponent;
  let fixture: ComponentFixture<KampagneListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KampagneListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KampagneListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
