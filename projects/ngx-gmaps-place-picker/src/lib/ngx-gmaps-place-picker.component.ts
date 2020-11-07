import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare const google: any;

@Component({
  selector: 'ngx-gmaps-place-picker',
  templateUrl: "./ngx-gmaps-place-picker.html",
  styles: [
    ".ngx-gmaps-cotainer{ position: relative; width:100%; height: 500px; display: block; }",
    ".ngx-gmaps-input{ height: 25px; width: 100%; padding: 3px 5px;}",
    ".show-ngx-gmaps{display: block;}",
    ".hide-ngx-gmaps{display: none;}",
    ".ngx-gmaps-wrapper: {width: 100%; height: 100%; display: none;}"
  ]
})
export class NgxGmapsPlacePickerComponent implements OnInit {

  @Input() config: any;
  @Output() onLocationChanged = new EventEmitter<any>();

  showMapData: boolean = false;
  isUsingCustomInput: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if(this.config.hasOwnProperty("lat") && this.config.hasOwnProperty("lng") && this.config.hasOwnProperty("advanced_mode")){
      this.showMapData = true;
      //The center location of our map.
      var centerOfMap = new google.maps.LatLng( 12.9394111, 77.5368767);
      console.log(this.config, centerOfMap.lat())
      //Map options.
      var options = {
        center: centerOfMap, //Set center.
        zoom: 15, //The zoom value.
        draggable: false,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
        streetViewControl: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        overviewMapControl: false,
        rotateControl: false
      };

      let markerOptions = {
        position: centerOfMap,
        draggable: true,
        animation: null,
        icon: null
      };

      if(this.config.hasOwnProperty("zoom")) options.zoom = this.config.zoom;
      if(this.config.hasOwnProperty("draggable")) options.draggable = this.config.draggable;
      if(this.config.hasOwnProperty("map_type")) options.mapTypeId = this.config.map_type;
      if(this.config.hasOwnProperty("controls")) {
        let controls = this.config.controls;

        if(controls.hasOwnProperty("default")) options.disableDefaultUI = controls.default;
        if(controls.hasOwnProperty("pan")) options.panControl = controls.pan;
        if(controls.hasOwnProperty("zoom")) options.zoomControl = controls.zoom;
        if(controls.hasOwnProperty("map_type")) options.mapTypeControl = controls.map_type;
        if(controls.hasOwnProperty("scale")) options.scaleControl = controls.scale;
        if(controls.hasOwnProperty("overview_map")) options.overviewMapControl = controls.overview_map;
        if(controls.hasOwnProperty("rotate")) options.rotateControl = controls.rotate;

      }

      if(this.config.hasOwnProperty("controls")) {
        let markerControl = this.config.marker;
        
        if(markerControl.hasOwnProperty("default")) markerOptions.icon = markerControl.icon;
        if(markerControl.hasOwnProperty("draggable")) markerOptions.draggable = markerControl.draggable;
        if(markerControl.hasOwnProperty("animation")) {
          switch(markerControl.animation){
            case "drop": markerOptions.animation = google.maps.Animation.DROP; break;
            case "bounce": markerOptions.animation = google.maps.Animation.BOUNCE; break;
            default: markerOptions.animation = null; break;
          }
        }
      }

      //Create the map object.

      let customInput: any = false;
      if(this.config.hasOwnProperty("search_input")) customInput = this.config.search_input;

      this.initMap(options, markerOptions, this.config.advanced_mode, customInput);

    }
  }

  doResponse(response, mode){
    let formatted_address = response.formatted_address;
    let lat = response.geometry.location.lat();
    let lng = response.geometry.location.lng();
    let address_components = response.address_components;

    let res = {lat, lng};

    if(mode) {
      res['formatted_address'] = formatted_address;
      res['address_components'] = address_components;
    }

    this.onLocationChanged.emit(res);
  }

  initMap(options, markerOptions, mode, customInput){
    console.log(options, marker);
    var map:any = new google.maps.Map(document.getElementById('ngx-gmaps-cotainer'), options);
    markerOptions.map = map;
    
    var marker:any = marker = new google.maps.Marker(markerOptions);
    

    var input = document.getElementById('ngx-gmaps-input');
    if(customInput){
      input = document.getElementById(customInput);
      this.isUsingCustomInput = true;
    }

    var autocomplete = new google.maps.places.Autocomplete(input);
    let that = this;
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace();
      map.panTo(place.geometry.location);
      marker.setPosition(place.geometry.location);
      that.doResponse(place, mode);
    });

    marker.addListener('dragend', function(event){
      let geocoder:any = new google.maps.Geocoder();
        geocoder.geocode({
          latLng: marker.getPosition()
        }, (responses) => that.doResponse(responses[0], mode));
    });

  }

}
