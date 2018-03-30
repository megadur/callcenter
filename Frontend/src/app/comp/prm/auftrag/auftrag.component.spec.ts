import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragComponent } from './auftrag.component';

describe('AuftragComponent', () => {
  let component: AuftragComponent;
  let fixture: ComponentFixture<AuftragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
