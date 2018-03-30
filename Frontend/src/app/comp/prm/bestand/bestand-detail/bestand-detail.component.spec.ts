import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestandDetailComponent } from './bestand-detail.component';

describe('BestandDetailComponent', () => {
  let component: BestandDetailComponent;
  let fixture: ComponentFixture<BestandDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestandDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
