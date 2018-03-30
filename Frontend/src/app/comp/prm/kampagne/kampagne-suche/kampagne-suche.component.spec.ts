import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KampagneSucheComponent } from './kampagne-suche.component';

describe('KampagneSucheComponent', () => {
  let component: KampagneSucheComponent;
  let fixture: ComponentFixture<KampagneSucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KampagneSucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KampagneSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
