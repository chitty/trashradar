import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthActions } from '../../common/auth';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const mockBackend: MockBackend = new MockBackend();
  let storeSubject: BehaviorSubject<object>;
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockAuthActions {
    public signUp = jasmine.createSpy('signUp');
  }


  beforeEach(async(() => {
    storeSubject = new BehaviorSubject({});

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [ SignUpComponent ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: AuthActions, useClass: MockAuthActions },
        { provide: Router, useValue: router, },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading flag', () => {
    expect(component.loading).toBeFalsy();
    storeSubject.next({});
    expect(component.loading).toBeFalsy();
    storeSubject.next({ inProgress: true });
    expect(component.loading).toBeTruthy();
  });

  it('should dispatch sign up action', () => {
    const credentials = {
      username: 'test',
      password: 'real',
      email: 'real@gmail.com'
    };
    component.credentials = credentials;
    component.signUp();
    const actions = fixture.debugElement.injector.get(AuthActions);
    expect(actions.signUp).toHaveBeenCalledWith(credentials);
  });

  it('should set error messages', () => {
    // Should start clean
    expect(component.errorMessage).toEqual('', 'Expected no error message');

    // Should remain clean if no error
    storeSubject.next({});
    expect(component.errorMessage).toEqual('', 'Should remain empty');

    // Specific status messages
    storeSubject.next({
      error: { _body: '{"message": "The error message."}' }
    });
    expect(component.errorMessage).toEqual('The error message.', 'Expected an error message');

    storeSubject.next({
      error: { _body: '{"username": "Username is required"}' }
    });
    expect(component.errorMessage).toEqual('Username is required', 'Expected an error message');

    storeSubject.next({
      error: {}
    });
    expect(component.errorMessage).toEqual('Unforseen error.');
  });

  it('should unsubscribe on destroy', () => {
    expect(storeSubject.observers.length).toEqual(1, 'Should subscribe initially');
    fixture.destroy();
    expect(storeSubject.observers.length).toEqual(0, 'Should unsubscribe after destruction');
  });
});
