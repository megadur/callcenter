import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalogDetailComponent } from './katalog-detail.component';

describe('KatalogDetailComponent', () => {
  let component: KatalogDetailComponent;
  let fixture: ComponentFixture<KatalogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatalogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KatalogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
