import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragMsgListComponent } from './auftrag-msg-list.component';

describe('AuftragMsgListComponent', () => {
  let component: AuftragMsgListComponent;
  let fixture: ComponentFixture<AuftragMsgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftragMsgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftragMsgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
