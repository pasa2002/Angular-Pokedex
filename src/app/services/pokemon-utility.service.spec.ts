import { TestBed } from '@angular/core/testing';

import { PokemonUtilityService } from './pokemon-utility.service';

describe('PokemonUtilityService', () => {
  let service: PokemonUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
