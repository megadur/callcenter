import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktDetailComponent } from './produkt-detail.component';

describe('ProduktDetailComponent', () => {
  let component: ProduktDetailComponent;
  let fixture: ComponentFixture<ProduktDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduktDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
