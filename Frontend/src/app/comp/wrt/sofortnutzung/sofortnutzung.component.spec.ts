import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SofortnutzungComponent } from './sofortnutzung.component';

describe('SofortnutzungComponent', () => {
  let component: SofortnutzungComponent;
  let fixture: ComponentFixture<SofortnutzungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SofortnutzungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SofortnutzungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
