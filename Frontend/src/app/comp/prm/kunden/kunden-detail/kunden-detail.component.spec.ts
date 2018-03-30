import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenDetailComponent } from './kunden-detail.component';

describe('KundenDetailComponent', () => {
  let component: KundenDetailComponent;
  let fixture: ComponentFixture<KundenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
