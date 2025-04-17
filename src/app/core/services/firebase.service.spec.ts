import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { UtilsService } from './utils.service';
import { of } from 'rxjs';

// Mocks
const mockAuth = jasmine.createSpyObj('Auth', ['signOut']);
const mockFirestore = {};
const mockStorage = {};
const mockUtilsService = jasmine.createSpyObj('UtilsService', ['routerLink']);

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: Auth, useValue: mockAuth },
        { provide: Firestore, useValue: mockFirestore },
        { provide: Storage, useValue: mockStorage },
        { provide: UtilsService, useValue: mockUtilsService },
      ],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more tests here depending on what needs to be mocked and tested

  // Example test for signIn (mock getAuth and signInWithEmailAndPassword if needed)
  // it('should call signInWithEmailAndPassword', async () => {
  //   const user = { email: 'test@example.com', password: '123456' } as any;
  //   const signInSpy = spyOn(service, 'signIn').and.returnValue(Promise.resolve());
  //   await service.signIn(user);
  //   expect(signInSpy).toHaveBeenCalledWith(user);
  // });

  // Similarly mock other external firebase methods if needed to write unit tests
});
