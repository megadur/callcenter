import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragExtDetailComponent } from './auftrag-ext-detail.component';

describe('AuftragExtDetailComponent', () => {
  let component: AuftragExtDetailComponent;
  let fixture: ComponentFixture<AuftragExtDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftragExtDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftragExtDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
