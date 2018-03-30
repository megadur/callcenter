import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerComponent } from './fehler.component';

describe('FehlerComponent', () => {
  let component: FehlerComponent;
  let fixture: ComponentFixture<FehlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
