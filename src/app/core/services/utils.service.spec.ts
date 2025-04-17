import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        { provide: Router, useValue: spy },
      ],
    });

    service = TestBed.inject(UtilsService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to a given URL using routerLink()', () => {
    const url = '/auth';
    service.routerLink(url);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(url);
  });

  it('should set and get local storage item correctly', () => {
    const key = 'testKey';
    const value = { name: 'test' };

    service.setLocalStorage(key, value);
    const result = service.getLocalStorage(key);

    expect(result).toEqual(value);
  });

  it('should return empty object if key does not exist in local storage', () => {
    const result = service.getLocalStorage('nonExistingKey');
    expect(result).toEqual({});
  });
});
