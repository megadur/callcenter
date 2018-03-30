import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalogReloadComponent } from './katalog-reload.component';

describe('KatalogReloadComponent', () => {
  let component: KatalogReloadComponent;
  let fixture: ComponentFixture<KatalogReloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatalogReloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KatalogReloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
