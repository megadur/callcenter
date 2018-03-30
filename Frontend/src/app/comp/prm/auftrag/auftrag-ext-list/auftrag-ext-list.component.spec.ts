import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragExtListComponent } from './auftrag-ext-list.component';

describe('AuftragExtListComponent', () => {
  let component: AuftragExtListComponent;
  let fixture: ComponentFixture<AuftragExtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftragExtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftragExtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
