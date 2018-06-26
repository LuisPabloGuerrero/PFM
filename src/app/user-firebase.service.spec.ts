import { TestBed, inject } from '@angular/core/testing';

import { UserFirebaseService } from './user-firebase.service';

describe('UserFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFirebaseService]
    });
  });

  it('should be created', inject([UserFirebaseService], (service: UserFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
