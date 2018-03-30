import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutzermgmtComponent } from './nutzermgmt.component';

describe('NutzermgmtComponent', () => {
  let component: NutzermgmtComponent;
  let fixture: ComponentFixture<NutzermgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutzermgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutzermgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
