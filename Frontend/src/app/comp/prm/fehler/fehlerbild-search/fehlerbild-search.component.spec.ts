import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerbildSearchComponent } from './fehlerbild-search.component';

describe('FehlerbildSearchComponent', () => {
  let component: FehlerbildSearchComponent;
  let fixture: ComponentFixture<FehlerbildSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerbildSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerbildSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
