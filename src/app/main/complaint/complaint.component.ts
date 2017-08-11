import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Store } from '@ngrx/store';

import { ComplaintActions } from '../../common/complaint';

export class Coordinates {
  type: string;
  coordinates: [number, number];
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
  @ViewChild('locationInput') public locationElement: ElementRef;
  public markedCoords: Coordinates = {
    type: 'Point',
    coordinates: [40.7485413, -73.98575770000002],
  };
  public form = {
    picture: null,
    location: { ...this.markedCoords },
    entity: null,
  };
  public imagePreview = '';
  public mapPosition = '';
  public geocoder: google.maps.Geocoder;
  public staticEntities = [
    { name: 'Real entity', id: 1 },
    { name: 'Gov\'na', id: 2 },
    { name: 'Da police', id: 3 },
  ];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<any>,
    private complaintActions: ComplaintActions,
  ) {}

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
    this.markedCoords.coordinates = [coords.lat, coords.lng];
    if (updatePosition) {
      this.form.location = { ...this.markedCoords };
    }

    if (this.geocoder) {
      this.geocoder.geocode({ location: coords }, (geocodeResults) => {
        if (geocodeResults && geocodeResults.length) {
          this.ngZone.run(() => {
            this.mapPosition = geocodeResults[0].formatted_address;
          });
        }
      });
    }
  }

  updateImage(event: any) {
    const files: FileList = event.srcElement.files;
    const file = files.length ? files[0] : null;

    this.form.picture = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    }
    reader.readAsDataURL(file);
  }

  onSubmit(form) {
    this.store.dispatch(this.complaintActions.createComplaint({
      ...form,
      location: `${form.location.type}(${form.location.coordinates[0]} ${form.location.coordinates[1]})`
    }));
  }
}
