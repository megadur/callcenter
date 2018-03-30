import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragIntListComponent } from './auftrag-int-list.component';

describe('AuftragIntListComponent', () => {
  let component: AuftragIntListComponent;
  let fixture: ComponentFixture<AuftragIntListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftragIntListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftragIntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
