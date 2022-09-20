import { TestBed } from '@angular/core/testing';

import { MarvelHerosService } from './marvel-heros.service';

describe('MarvelHerosService', () => {
  let service: MarvelHerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarvelHerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
