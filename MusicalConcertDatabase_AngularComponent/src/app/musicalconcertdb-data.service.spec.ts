import { TestBed } from '@angular/core/testing';

import { MusicalconcertdbDataService } from './musicalconcertdb-data.service';

describe('MusicalconcertdbDataService', () => {
  let service: MusicalconcertdbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicalconcertdbDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
