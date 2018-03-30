import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragSucheComponent } from './auftrag-suche.component';

describe('AuftragSucheComponent', () => {
  let component: AuftragSucheComponent;
  let fixture: ComponentFixture<AuftragSucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftragSucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftragSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
