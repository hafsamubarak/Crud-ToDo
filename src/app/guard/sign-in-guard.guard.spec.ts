import { TestBed } from '@angular/core/testing';

import { SignInGuardGuard } from './sign-in-guard.guard';

describe('SignInGuardGuard', () => {
  let guard: SignInGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignInGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
