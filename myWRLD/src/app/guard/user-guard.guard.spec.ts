import { TestBed } from '@angular/core/testing';

import { UserInitGuardGuard } from './user-init-guard.guard';

describe('UserGuardGuard', () => {
  let guard: UserInitGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserInitGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
