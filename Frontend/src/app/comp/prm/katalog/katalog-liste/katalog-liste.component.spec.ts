import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalogListeComponent } from './katalog-liste.component';

describe('KatalogListeComponent', () => {
  let component: KatalogListeComponent;
  let fixture: ComponentFixture<KatalogListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatalogListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KatalogListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
