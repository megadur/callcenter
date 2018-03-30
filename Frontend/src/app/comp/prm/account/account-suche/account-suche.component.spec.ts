import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSucheComponent } from './account-suche.component';

describe('AccountSucheComponent', () => {
  let component: AccountSucheComponent;
  let fixture: ComponentFixture<AccountSucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
