import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnListeComponent } from './sn-liste.component';

describe('SnListeComponent', () => {
  let component: SnListeComponent;
  let fixture: ComponentFixture<SnListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
