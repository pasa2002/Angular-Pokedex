import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeStatComponent } from './poke-stat.component';

describe('PokeStatComponent', () => {
  let component: PokeStatComponent;
  let fixture: ComponentFixture<PokeStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokeStatComponent]
    });
    fixture = TestBed.createComponent(PokeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
