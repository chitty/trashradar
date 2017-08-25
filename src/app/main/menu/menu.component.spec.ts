/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthActions } from '../../common/auth';
import { MenuComponent } from './menu.component';

class MockStore {
  public dispatch = jasmine.createSpy('dispatch');
}

class MockAuthActions {
  public logout = jasmine.createSpy('logout');
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };
  const mockBackend: MockBackend = new MockBackend();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        { provide: Store, useClass: MockStore, },
        { provide: AuthActions, useClass: MockAuthActions, },
        { provide: Router, useValue: router, },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action on logout', () => {
    component.logout();
    const actions = fixture.debugElement.injector.get(AuthActions);
    expect(actions.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
