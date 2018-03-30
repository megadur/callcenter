import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KampagneEditComponent } from './kampagne-edit.component';

describe('KampagneEditComponent', () => {
  let component: KampagneEditComponent;
  let fixture: ComponentFixture<KampagneEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KampagneEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KampagneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
