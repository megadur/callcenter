import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalogEditComponent } from './katalog-edit.component';

describe('KatalogEditComponent', () => {
  let component: KatalogEditComponent;
  let fixture: ComponentFixture<KatalogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatalogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KatalogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
