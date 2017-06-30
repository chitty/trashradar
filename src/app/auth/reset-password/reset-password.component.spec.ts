import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/Rx';

import { AuthActions } from '../../common/auth';
import { ResetPasswordComponent } from './reset-password.component';

xdescribe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  const mockBackend: MockBackend = new MockBackend();
  let storeSubject: BehaviorSubject<object>;

  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
    public select = () => storeSubject;
  }

  class MockAuthActions {
    public resetPassword = jasmine.createSpy('resetPassword');
  }


  beforeEach(async(() => {
    storeSubject = new BehaviorSubject({});

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [ ResetPasswordComponent ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: AuthActions, useClass: MockAuthActions },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch resetPassword action', () => {
    const username = 'somebody';
    component.username = username;
    component.reset_password();
    const actions = fixture.debugElement.injector.get(AuthActions);
    expect(actions.resetPassword).toHaveBeenCalledWith(username);
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
      error: { _body: '{"errors": {"username": "Username is required"} }' }
    });
    expect(component.errorMessage).toEqual('Username is required', 'Expected an error message');

    storeSubject.next({
      error: {}
    });
    expect(component.errorMessage).toEqual('Unforseen error.');
  });
});
