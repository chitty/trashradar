/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Store } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { ComplaintComponent } from './complaint.component';
import { ComplaintActions } from '../../common/complaint';

// TODO: fix the multiple inclusion error.
// Current agm version defines a global google variable which makes mocking hard.
describe('ComplaintComponent', () => {
  let component: ComplaintComponent;
  let fixture: ComponentFixture<ComplaintComponent>;
  let store: MockStore;
  const testCoords: any = {
    coords: {
      latitude: 12,
      longitude: 11,
    }
    // type: 'Point',
    // coordinates: [12, 11],
  };
  let mapAPILoader: MapsAPILoader;
  const navigatorSpy = jasmine.createSpy('getCurrentPosition').and.callFake((func) => func(testCoords));
  navigator.geolocation.getCurrentPosition = navigatorSpy;
  class MockStore {
    public dispatch = jasmine.createSpy('dispatch');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        FormsModule,
        AgmCoreModule.forRoot({
          apiKey: environment.googleMapsAPIKey,
          libraries: ['places']
        })
      ],
      providers: [
        ComplaintActions,
        { provide: Store, useClass: MockStore },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintComponent);
    component = fixture.componentInstance;
    mapAPILoader = TestBed.get(MapsAPILoader);
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get position on load', () => {
    spyOn(component, 'setPosition');
    component.ngOnInit();
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(component.setPosition).toHaveBeenCalledWith(
      { coords: { lat: testCoords.coords.latitude, lng: testCoords.coords.longitude } },
      true
    );
  });

  it('should update position', () => {
    let position = { coords: { lat: 2, lng: 5 }};
    component.setPosition(position);
    let expected: any = {
      type: 'Point',
      coordinates: [position.coords.lat, position.coords.lng],
    };
    expect(component.markedCoords).toEqual(expected);
    expect(component.form.location).not.toEqual(expected);

    position = { coords: { lat: 5, lng: 12 }};
    component.setPosition(position, true);
    expected = {
      type: 'Point',
      coordinates: [position.coords.lat, position.coords.lng],
    };
    expect(component.markedCoords).toEqual(expected);
    expect(component.form.location).toEqual(expected);

    const address = 'test';
    position = { coords: { lat: 11, lng: 111 }};
    component.geocoder = {
      geocode: jasmine.createSpy('geocode').and.callFake((location, func) => func([{ formatted_address: address }]))
    };
    component.setPosition(position);
    expect(component.geocoder.geocode).toHaveBeenCalledWith({ location: position.coords }, jasmine.any(Function))
    expect(component.mapPosition).toEqual(address);
  });

  it('should update image', () => {
    const event = {
      srcElement: {
        files: [],
      }
    };
    spyOn(window, 'FileReader' as any).and.returnValue(({ readAsDataURL: jasmine.createSpy('read') }));
    component.updateImage(event);
    expect(component.form.image).toEqual(null);

    const file = 'realFile';
    event.srcElement.files.push(file);
    component.updateImage(event);
    expect(component.form.image).toEqual(file);
  });

  it('should dispatch on submit', () => {
    const mockForm = {
      data: true,
      location: {
        type: 'test',
        coordinates: [1, 2],
      },
      object: {
        field: 'yes',
        array: [1, 2, 3],
      },
    };
    component.onSubmit(mockForm);
    const complaintActions: ComplaintActions = TestBed.get(ComplaintActions);
    expect(store.dispatch).toHaveBeenCalledWith(complaintActions.createComplaint({
      ...mockForm,
      location: `${mockForm.location.type}(${mockForm.location.coordinates[0]} ${mockForm.location.coordinates[1]})`
    }))
  });
});
