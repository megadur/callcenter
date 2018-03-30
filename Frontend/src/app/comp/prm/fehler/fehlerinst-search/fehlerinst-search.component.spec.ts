import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerinstSearchComponent } from './fehlerinst-search.component';

describe('FehlerinstSearchComponent', () => {
  let component: FehlerinstSearchComponent;
  let fixture: ComponentFixture<FehlerinstSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerinstSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerinstSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
