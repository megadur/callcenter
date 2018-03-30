import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalogSucheComponent } from './katalog-suche.component';

describe('KatalogSucheComponent', () => {
  let component: KatalogSucheComponent;
  let fixture: ComponentFixture<KatalogSucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatalogSucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KatalogSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
