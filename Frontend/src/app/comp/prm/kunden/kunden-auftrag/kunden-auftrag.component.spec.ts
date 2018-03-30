import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenAuftragComponent } from './kunden-auftrag.component';

describe('KundenAuftragComponent', () => {
  let component: KundenAuftragComponent;
  let fixture: ComponentFixture<KundenAuftragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundenAuftragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenAuftragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
