import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnEinzelComponent } from './sn-einzel.component';

describe('SnEinzelComponent', () => {
  let component: SnEinzelComponent;
  let fixture: ComponentFixture<SnEinzelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnEinzelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnEinzelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
