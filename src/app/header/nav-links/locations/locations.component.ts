import { Component } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {
  apiLoaded: boolean = false;

  // Center of the map (coordinates of Toronto)
  center: google.maps.LatLngLiteral = { lat: 35.219935537492844, lng: -97.44287187051303 };
  zoom = 10;

  // Locations array with coordinates and address
  locations = [
    { lat: 35.219935537492844, lng: -97.44287187051303, title: 'Toronto', address: 'Suite 360-144 Front Street West, Toronto, Ontario, M5J 2L7' },
    // Add other locations here
  ];
  constructor() {}

  ngOnInit(): void {
    // Dynamically load the Maps JavaScript API if not already loaded
    if (!this.apiLoaded) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.async = true;
      document.head.appendChild(script);
      this.apiLoaded = true;
    }
  }
}
