import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerbildDefComponent } from './fehlerbild-def.component';

describe('FehlerbildDefComponent', () => {
  let component: FehlerbildDefComponent;
  let fixture: ComponentFixture<FehlerbildDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerbildDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerbildDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
