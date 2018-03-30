import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KampagneModComponent } from './kampagne-mod.component';

describe('KampagneModComponent', () => {
  let component: KampagneModComponent;
  let fixture: ComponentFixture<KampagneModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KampagneModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KampagneModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
