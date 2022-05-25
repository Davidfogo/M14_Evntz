import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiserviceService } from '../apiservice.service';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
  id: any
  map : Leaflet.Map
  events:any
  arrayEvento:any =[]
  
  
  constructor(
    private activatedRoute : ActivatedRoute,
    public apiService: ApiserviceService,

  ) { 
    this.getAllEvents();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("id",this.id);
  }

  ionViewDidEnter() { 
    this.leafletMap(); 
  }


  getAllEvents(){  
    this.apiService.apiGetEvents().subscribe((response) => {
      console.log(response);
      this.events = response;
      

      for (let i = 0; i < this.events.length; i++) {
        if (this.id == this.events[i].eventId) {
          this.arrayEvento.push(this.events[i]);
         
        }
      }
    });
  }

  leafletMap() {
    this.map = Leaflet.map('mapa2').setView([41.416282, 2.198960], 10);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
    }).addTo(this.map);

    var UrgentMarker = new Leaflet.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [ 13, 0 ],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    for (let i = 0; i < this.events.length; i++) {
      if (this.id == this.events[i].eventId) {

        console.log(this.events[i].longitud);
        Leaflet.marker([this.events[i].latitud, this.events[i].longitud], {icon:UrgentMarker}).addTo(this.map);
        
      }
      
    }
     
    }
    
  }

