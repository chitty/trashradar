import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

export class Coordinates {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  @ViewChild('locationInput') public locationElement: ElementRef;
  public markedCoords: Coordinates = {
    latitude: 40.7485413,
    longitude: -73.98575770000002
  };
  public mapPosition: Coordinates = this.markedCoords;
  public location = '';
  public geocoder: google.maps.Geocoder;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.setPosition({ coords }, true);
    });

    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      const autocomplete = new google.maps.places.Autocomplete(this.locationElement.nativeElement);
      autocomplete.addListener('place_changed', () => this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        if (!place.geometry) { return; }

        const coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
        this.setPosition({ coords }, true);
      }));
    });
  }

  setPosition({ coords }, updatePosition = false) {
    this.markedCoords = {
      latitude: coords.lat,
      longitude: coords.lng,
    };
    if (updatePosition) {
      this.mapPosition = this.markedCoords;
    }

    if (this.geocoder) {
      this.geocoder.geocode({ location: coords }, (geocodeResults) => {
        if (geocodeResults && geocodeResults.length) {
          this.ngZone.run(() => {
            this.location = geocodeResults[0].formatted_address;
          });
        }
      });

    }
  }
}
