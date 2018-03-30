import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestandEditComponent } from './bestand-edit.component';

describe('BestandEditComponent', () => {
  let component: BestandEditComponent;
  let fixture: ComponentFixture<BestandEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestandEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
