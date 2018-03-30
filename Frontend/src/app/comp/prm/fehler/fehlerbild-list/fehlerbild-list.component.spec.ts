import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerbildListComponent } from './fehlerbild-list.component';

describe('FehlerbildListComponent', () => {
  let component: FehlerbildListComponent;
  let fixture: ComponentFixture<FehlerbildListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerbildListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerbildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
