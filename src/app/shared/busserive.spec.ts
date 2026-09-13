import { TestBed } from '@angular/core/testing';

import { Busserive } from './busserive';

describe('Busserive', () => {
  let service: Busserive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Busserive);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
