import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
//import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
// from search
import { RestProvider } from '../../providers/rest/rest';
//import { ItemPage } from '../itemPage/itemPage';

declare var google: any;

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
  //providers: [GoogleMaps]
})

export class LocationsPage {
 
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;

  markers: any;
  //autocomplete: any;
  //GoogleAutocomplete: any;
  //GooglePlaces: any;
  geocoder: any
  //autocompleteItems: any;
  //loading: any;

  // these are from search module
  //public items: any = [];
  searchTerm: string = '';
  //public itemInfo: any;
  public locations: any = [];
  //public locationsInfo: any;
    
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public zone: NgZone, public restProvider: RestProvider, public navParams: NavParams, public event: Events) {
    let elem = document.createElement("div");
    //this.GooglePlaces = new google.maps.places.PlacesService(elem);
    //this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    //this.autocomplete = { input: '' };
    //this.autocompleteItems = [];
    this.markers = [];
    this.geocoder = new google.maps.Geocoder;
    this.locations = [];
    // from search
  }
    
     ionViewDidLoad(){
       this.loadMap();
       this.startNavigating();
     }
     
     loadMap(){
      
      this.geolocation.getCurrentPosition().then((position) => {
    
       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
       let mapOptions = {
         center: latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
      }, (err) => {
          console.log(err);
      });
     }
     // these 2 methods are from search
     public async searchItems() {
      // clear locations while user types
      this.locations = [];

      // search connection with our REST provider
        if (this.searchTerm) {
          this.restProvider.searchItems(this.searchTerm)
          .then(data => {
            this.locations = data;
            // console.log("data: " , data);
          });
        
          console.log("items: " , this.locations);
        } 
      }

      public async getLocationInfo(i: any) {
        if (this.locations[i]) {
          this.locations = this.locations[i].locations;
        }
        console.log("adding markers to map");
        // for every stored location for a given item, add a marker to the map
        for(var j = 0; i < this.locations.length; i++) {
            this.addMarker(this.locations[i].lat, this.locations[i].long, this.locations[i].name);
        }
      }

    clearMarkers(){
      for (var i = 0; i < this.markers.length; i++) {
        console.log(this.markers[i])
        this.markers[i].setMap(null);
      }
      this.markers = [];
    }

     addInfoWindow(marker, content){
 
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
     
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
     
    }
    addMarkerCenter(){
      // if admin user wants to add locations (will be developed in iteration 3) for now just adds marker to center of map on screen
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
     
      let content = "<h4>Information!</h4>";         
     
      this.addInfoWindow(marker, content);
     
    }
    
     addMarker(lat, long, name){
      // clears old markers from map
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(lat,long)
      });
     
      let content = name;         
     
      this.addInfoWindow(marker, content);
     
    }

    startNavigating(){
 
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);
      directionsDisplay.setPanel(this.directionsPanel.nativeElement);

      directionsService.route({
          origin: 'adelaide',
          destination: 'adelaide oval',
          travelMode: google.maps.TravelMode['DRIVING']
      }, (res, status) => {

          if(status == google.maps.DirectionsStatus.OK){
              directionsDisplay.setDirections(res);
          } else {
              console.warn(status);
          }

      });

  }
}

// export class LocationsPage implements OnInit {
//    map: GoogleMap;
 
//   constructor(
//     public navCtrl: NavController, 
//     public platform: Platform,
//     private _googleMaps: GoogleMaps
//  ) {
  //  map: GoogleMap;
 
//   constructor(
//     public navCtrl: NavController, 
//     public platform: Platform,
//     private _googleMaps: GoogleMaps
//  ) {

  //  function ngOnInit() {
  //   console.log("on init");
  //   this.initMap();
  // }

      // var map;
      // function initMap() {
      //   console.log("It's running...");
      //   map = new google.maps.Map(document.getElementById('map'), {
      //     center: {lat: -34.397, lng: 150.644},
      //     zoom: 8
      //   });
      // }
// ngAfterViewInit() {
//   const options: any = { ... } // put your config here
//   const map: GoogleMap = this.googleMaps.create('map', options);
// }
  // this._googleMaps.isAvailable().then(() =>