import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerinstListComponent } from './fehlerinst-list.component';

describe('FehlerinstListComponent', () => {
  let component: FehlerinstListComponent;
  let fixture: ComponentFixture<FehlerinstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerinstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerinstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
