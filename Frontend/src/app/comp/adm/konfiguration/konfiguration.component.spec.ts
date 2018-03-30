import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonfigurationComponent } from './konfiguration.component';

describe('KonfigurationComponent', () => {
  let component: KonfigurationComponent;
  let fixture: ComponentFixture<KonfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
