import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerinstDetailComponent } from './fehlerinst-detail.component';

describe('FehlerinstDetailComponent', () => {
  let component: FehlerinstDetailComponent;
  let fixture: ComponentFixture<FehlerinstDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerinstDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerinstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
