/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapsAPILoader } from 'angular2-google-maps/core';

import { ComplaintComponent } from './complaint.component';

describe('ComplaintComponent', () => {
  let component: ComplaintComponent;
  let fixture: ComponentFixture<ComplaintComponent>;
  const testCoords = {
    coords: {
      latitude: 12,
      longitude: 11,
    }
  };
  let mapAPILoader: MapsAPILoader;
  const navigatorSpy = jasmine.createSpy('getCurrentPosition').and.callFake((func) => func(testCoords));
  navigator.geolocation.getCurrentPosition = navigatorSpy;

  class MockMapsAPILoader {
    load() { return { then: () => null } }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        FormsModule,
        AgmCoreModule.forRoot({
          libraries: ['places']
        })],
      providers: [{
        provide: MapsAPILoader,
        useClass: MockMapsAPILoader
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintComponent);
    component = fixture.componentInstance;
    mapAPILoader = TestBed.get(MapsAPILoader);
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
    let expected = { latitude: position.coords.lat, longitude: position.coords.lng };
    expect(component.markedCoords).toEqual(expected);
    expect(component.mapPosition).not.toEqual(expected);

    position = { coords: { lat: 5, lng: 12 }};
    component.setPosition(position, true);
    expected = { latitude: position.coords.lat, longitude: position.coords.lng };
    expect(component.markedCoords).toEqual(expected);
    expect(component.mapPosition).toEqual(expected);

    const address = 'test';
    position = { coords: { lat: 11, lng: 111 }};
    component.geocoder = {
      geocode: jasmine.createSpy('geocode').and.callFake((location, func) => func([{ formatted_address: address }]))
    };
    component.setPosition(position);
    expect(component.geocoder.geocode).toHaveBeenCalledWith({ location: position.coords }, jasmine.any(Function))
    expect(component.location).toEqual(address);
  });
});
