import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerbildDetailComponent } from './fehlerbild-detail.component';

describe('FehlerbildDetailComponent', () => {
  let component: FehlerbildDetailComponent;
  let fixture: ComponentFixture<FehlerbildDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerbildDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerbildDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
