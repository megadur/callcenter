import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerFilterComponent } from './fehler-filter.component';

describe('FehlerFilterComponent', () => {
  let component: FehlerFilterComponent;
  let fixture: ComponentFixture<FehlerFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
