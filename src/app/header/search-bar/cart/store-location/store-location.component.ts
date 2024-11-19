import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.scss']
})
export class StoreLocationComponent implements OnInit {
  isLoading = true;
  mapError = false;
  center: google.maps.LatLngLiteral = {
    lat: 50.93435585128542,
    lng: 6.9459653915830195
  };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon: {
      url: 'assets/images/marker.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  };
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#c9c9c9" }]
      }
    ]
  };
  storeInfo = {
    name: 'One Piece Store',
    address: 'Hansaring 97, 50670 Köln, Germany',
    phone: '+49 123 456 789',
    hours: 'Mon-Sat: 10:00 AM - 8:00 PM',
    email: 'store@onepiece.com',
    socialLinks: {
      facebook: 'https://facebook.com/onepiecestore',
      instagram: 'https://instagram.com/onepiecestore'
    }
  };

  branches = [
    {
      name: 'Main Branch',
      address: 'Hansaring 97, 50670 Köln',
      phone: '+49 123 456 789',
      hours: '10:00 AM - 8:00 PM'
    },
    {
      name: 'Downtown Branch',
      address: 'Schildergasse 65, 50667 Köln',
      phone: '+49 123 456 790',
      hours: '9:00 AM - 9:00 PM'
    }
  ];

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    try {
      if (typeof google === 'undefined') {
        throw new Error('Google Maps JavaScript API not loaded');
      }
      this.isLoading = false;
    } catch (error) {
      console.error('Map initialization error:', error);
      this.isLoading = false;
      this.mapError = true;
    }
  }
} 